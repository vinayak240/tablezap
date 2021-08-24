const { clone } = require("ramda");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const { updateOrderByOrderId, getOrderByOrderId } = require("./helpers");

const perform = async (payload) => {
  try {
    // There is no need for meta info here as this is the first version of the order
    // let acceptedOrder = await getOrderByOrderId(payload);
    acceptedOrder = clone(payload);
    acceptedOrder.status = ORDER_STATUS.PREPARING;
    const result = await updateOrderByOrderId(acceptedOrder);
    await OrderPublisher.publish(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
