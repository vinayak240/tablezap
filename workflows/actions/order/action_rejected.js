const { clone } = require("ramda");
const ITEM_STATUS = require("../../../constants/item_status");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const { updateOrderByOrderId } = require("./helpers");
const OrderCleaner = require("../../../utils/cleaners/order_cleaners");
const { MESSAGE_TYPE } = require("../../../constants/messages");

const perform = async (payload, status) => {
  try {
    rejectedOrder = clone(payload);

    if (status === ORDER_STATUS.ORDER_REJECTED) {
      rejectedOrder.status = status;
      rejectedOrder.rejected_items = clone(
        rejectedOrder.items.map((item) => {
          return { ...item, new: true };
        })
      );
    } else {
      rejectedOrder.updated_order.status = status;
      rejectedOrder.rejected_items = clone(
        rejectedOrder.updated_order.items.map((item) => {
          return { ...item, new: true };
        })
      );
    }

    rejectedOrder.is_update = false;

    rejectedOrder = OrderCleaner.postProcess(rejectedOrder);

    const result = await updateOrderByOrderId(rejectedOrder);
    await OrderPublisher.publish({
      type: MESSAGE_TYPE.RESPONSE_MESSAGE,
      msg: "Order Rejected",
      payload: result,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
