const { clone } = require("ramda");
const ITEM_STATUS = require("../../../constants/item_status");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const {
  updateOrderByOrderId,
  cloneUpdatedOrder,
  isOrderPartiallyAccepted,
} = require("./helpers");
const OrderCleaner = require("../../../utils/cleaners/order_cleaners");
const { MESSAGE_TYPE, END_PTS } = require("../../../constants/messages");

const perform = async (payload) => {
  try {
    acceptedOrder = clone(payload);

    if (isOrderPartiallyAccepted(acceptedOrder.updated_order)) {
      acceptedOrder.status = ORDER_STATUS.CANCELLED_PARTIALLY;
    } else {
      acceptedOrder.status = ORDER_STATUS.CANCELLED;
    }

    acceptedOrder = cloneUpdatedOrder(acceptedOrder);
    acceptedOrder = OrderCleaner.postProcess(acceptedOrder);
    const result = await updateOrderByOrderId(acceptedOrder);
    await OrderPublisher.publish({
      type: MESSAGE_TYPE.RESPONSE_MESSAGE,
      msg: "Order Cancelled Successfully",
      payload: result,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
