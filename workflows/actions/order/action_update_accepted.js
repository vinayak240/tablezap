const { clone } = require("ramda");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const {
  updateOrderByOrderId,
  cloneUpdatedOrder,
  isOrderPartiallyAccepted,
} = require("./helpers");
const OrderCleaner = require("../../../utils/cleaners/order_cleaners");
const { MESSAGE_TYPE } = require("../../../constants/messages");

const perform = async (payload) => {
  try {
    // items statuses shld be updated from restaurant side only
    acceptedOrder = clone(payload);

    if (isOrderPartiallyAccepted(acceptedOrder.updated_order)) {
      acceptedOrder.updated_order.status = ORDER_STATUS.UPDATED_PARTIALLY;
    } else {
      acceptedOrder.updated_order.status = ORDER_STATUS.UPDATED;
    }

    acceptedOrder = cloneUpdatedOrder(acceptedOrder);
    acceptedOrder = OrderCleaner.postProcess(acceptedOrder);
    let result = await updateOrderByOrderId(acceptedOrder);

    await OrderPublisher.publish({
      type: MESSAGE_TYPE.RESPONSE_MESSAGE,
      msg: "Order updated Successfully",
      payload: result,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
