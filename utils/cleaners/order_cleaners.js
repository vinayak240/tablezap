const { clone } = require("ramda");

const postProcess = (order) => {
  // add  accepted flags to all items and make the order ready for restaurant side view
  if (Boolean(order.items) && order.items.length > 0) {
    order.items = cleanItems(order.items);
  }

  if (Boolean(order.rejected_items) && order.rejected_items.length > 0) {
    order.rejected_items = cleanItems(order.rejected_items);
  }

  if (
    Boolean(order.updated_order?.items) &&
    order.updated_order.items.length > 0
  ) {
    order.updated_order.items = cleanItems(order.updated_order.items);
  }

  return clone(order);
};

const cleanItems = (items) => {
  return items.map((item) => {
    delete item.accepted;
    return item;
  });
};

module.exports = {
  postProcess,
};
