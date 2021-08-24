const { clone } = require("ramda");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const {
  getOrderByOrderId,
  updateOrderByOrderId,
  cloneUpdatedOrder,
} = require("./helpers");

const perform = async (payload) => {
  try {
    // let acceptedOrder = await getOrderByOrderId(payload);
    acceptedOrder = clone(payload);
    acceptedOrder = cloneUpdatedOrder(acceptedOrder);
    acceptedOrder.status = ORDER_STATUS.UPDATED;
    let result = await updateOrderByOrderId(acceptedOrder);
    await OrderPublisher.publish(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
