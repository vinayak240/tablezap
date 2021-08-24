const { clone } = require("ramda");
const Logger = require("../.../../../../utils/logger");
const Order = require("../../../db/models/Order");

const getOrderByOrderId = async (order) => {
  try {
    const result = await Order.findOne({
      rest_id: order.rest_id,
      _id: order._id,
    });
    if (!Boolean(result)) {
      throw new Error("No Order found");
    }

    return clone(result);
  } catch (err) {
    Logger.error(`[DB] Error retrieving Order, ERR: ${err}`);
    throw err;
  }
};

const updateOrderByOrderId = async (payload) => {
  try {
    let result = await Order.findOneAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { returnDocument: "after", upsert: false }
    );

    if (!Boolean(result)) {
      throw new Error("No Order found");
    }

    return result.toObject();
  } catch (err) {
    Logger.error(`[DB] Error updating Order, ERR: ${err}`);
    throw err;
  }
};

const cloneUpdatedOrder = (acceptedOrder) => {
  try {
    if (!acceptedOrder.is_update) {
      throw new Error("Cannot clone updated order, 'is_update' flag is false");
    }

    if (isObjEmpty(acceptedOrder.updated_order)) {
      throw new Error(
        "Cannot clone updated order, There is no info to be updated"
      );
    }

    let updatedOrder = { ...acceptedOrder.updatedOrder };

    if (Boolean(updatedOrder.status)) {
      acceptedOrder.status = updatedOrder.status;
    }

    if (updatedOrder.items.length > 0) {
      acceptedOrder.items = updatedOrder.items;
    }

    if (Boolean(updatedOrder.total_price)) {
      acceptedOrder.total_price = updatedOrder.total_price;
    }

    if (updatedOrder.offers.length > 0) {
      acceptedOrder.offers = updatedOrder.offers;
    }

    if (Boolean(updatedOrder.date)) {
      acceptedOrder.date = updatedOrder.date;
    }

    acceptedOrder.is_update = false;
    acceptedOrder.updated_order = {};

    return clone(acceptedOrder);
  } catch (err) {
    throw err;
  }
};

const isObjEmpty = (obj) => {
  if (!Boolean(obj)) {
    return true;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

module.exports = {
  getOrderByOrderId,
  updateOrderByOrderId,
  cloneUpdatedOrder,
  isObjEmpty,
};
