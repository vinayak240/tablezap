const { clone } = require("ramda");
const ORDER_STATUS = require("../../../constants/order_status");
const ITEM_STATUS = require("../../../constants/item_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const {
  updateOrderByOrderId,
  updateAllItemsStatus,
  isOrderPartiallyAccepted,
} = require("./helpers");
const OrderCleaner = require("../../../utils/cleaners/order_cleaners");
const { MESSAGE_TYPE } = require("../../../constants/messages");

const perform = async (payload) => {
  try {
    // There is no need for meta info here as this is the first version of the order
    acceptedOrder = clone(payload);

    if (isOrderPartiallyAccepted(acceptedOrder)) {
      acceptedOrder.status = ORDER_STATUS.ACCEPTED_PARTIALLY;
      acceptedOrder.rejected_items = acceptedOrder.items
        .filter((item) => !item.accepted)
        .map((item) => {
          return { ...item, new: true }; // specifies that this item was recently rejected
        });
      acceptedOrder.items = acceptedOrder.items.filter((item) => item.accepted);

      acceptedOrder.rejected_items = updateAllItemsStatus(
        acceptedOrder.rejected_items,
        ITEM_STATUS.CANCELLED
      );
    } else {
      acceptedOrder.status = ORDER_STATUS.PREPARING;
      acceptedOrder.rejected_items = [];

      acceptedOrder.items = updateAllItemsStatus(
        acceptedOrder.items,
        ITEM_STATUS.PREPARING
      );
    }

    acceptedOrder = OrderCleaner.postProcess(acceptedOrder);

    const result = await updateOrderByOrderId(acceptedOrder);
    await OrderPublisher.publish({
      type: MESSAGE_TYPE.RESPONSE_MESSAGE,
      msg: "Order accepted Successfully",
      payload: result,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
