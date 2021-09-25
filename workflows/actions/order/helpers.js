const { clone } = require("ramda");
const Logger = require("../.../../../../utils/logger");
const ITEM_STATUS = require("../../../constants/item_status");
const ORDER_STATUS = require("../../../constants/order_status");
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

const isOrderPartiallyAccepted = (order) => {
  return order.items.findIndex((item) => !item.accepted) !== -1;
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

    let updatedOrder = { ...acceptedOrder.updated_order };

    if (Boolean(updatedOrder.status)) {
      acceptedOrder.status = updatedOrder.status;
    }

    if (updatedOrder.items.length > 0) {
      acceptedOrder.items = cloneAcceptedItems(
        acceptedOrder.status,
        acceptedOrder.items,
        updatedOrder.items
      );
    }

    if (Boolean(updatedOrder.total_price)) {
      acceptedOrder.total_price = updatedOrder.total_price;
    }

    if (Boolean(updatedOrder?.offers) && updatedOrder.offers.length > 0) {
      acceptedOrder.offers = updatedOrder.offers;
    }

    if (Boolean(updatedOrder.date)) {
      acceptedOrder.date = updatedOrder.date;
    }

    acceptedOrder.rejected_items = updatedOrder.items
      .filter((item) => !item.accepted)
      .map((item) => {
        return { ...item, new: true };
      });

    acceptedOrder.is_update = false;

    acceptedOrder.updated_order = {};

    return clone(acceptedOrder);
  } catch (err) {
    throw err;
  }
};

const cloneAcceptedItems = (status, items, updated_items) => {
  if (!updated_items && updated_items.length === 0) {
    throw Error("[IMPL] No updated items present");
  }

  let acceptedItems = updated_items.filter((item) => item.accepted);

  if (
    [ORDER_STATUS.UPDATE_ACCEPTED, ORDER_STATUS.UPDATED_PARTIALLY].includes(
      status
    )
  ) {
    items = items.map((item) => {
      let idx = acceptedItems.findIndex((up_item) => up_item.id === item.id);
      if (idx !== -1) {
        let status =
          item.status === ITEM_STATUS.CANCEL
            ? ITEM_STATUS.CANCELLED
            : ITEM_STATUS.PREPARING;
        let quantity =
          item.status === ITEM_STATUS.CANCEL
            ? item.quantity
            : Number(item.quantity || 1) +
              Number(acceptedItems[idx].quantity || 1);
        item = { ...acceptedItems[idx], status, quantity };
        acceptedItems.splice(idx, 1);
      }

      return item;
    });
    return [...items, ...acceptedItems];
  } else {
    return items.map((item) => {
      let idx = acceptedItems.findIndex((up_item) => up_item.id === item.id);
      if (idx !== -1) {
        item = acceptedItems[idx];
        item.status = ITEM_STATUS.CANCELLED;
      }

      return item;
    });
  }
};

const updateAllItemsStatus = (items, status) => {
  return items.map((item) => {
    item.status = status;
    return item;
  });
};

const updateItemsStatusSelectively = (items, updated_items) => {
  return items.map((item) => {
    let idx = updated_items.findIndex((up_item) => up_item.id === item.id);
    if (idx !== -1) {
      return updated_items[idx];
    }

    return items[idx];
  });
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
  updateAllItemsStatus,
  updateItemsStatusSelectively,
  isOrderPartiallyAccepted,
  isObjEmpty,
};
