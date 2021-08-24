const { clone } = require("ramda");
const ORDER_STATUS = require("../../../constants/order_status");
const OrderPublisher = require("../../../messaging/publishers/OrderPublisher");
const { updateOrderByOrderId, getOrderByOrderId } = require("./helpers");

const perform = async (payload, status) => {
  try {
    // we dont clone here the meta info is kept like that
    // let rejectedOrder = await getOrderByOrderId(payload);
    rejectedOrder = clone(payload);
    // Not necessary, just doule verify the status to be rejected
    payload.updated_order = { status };
    payload.is_update = false;

    const result = await updateOrderByOrderId(rejectedOrder);
    await OrderPublisher.publish(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
