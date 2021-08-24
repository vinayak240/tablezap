/**
 * @summary All the defined Item Statuses
 */
const ITEM_STATUS = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  CANCEL: "CANCEL", // manual

  CANCEL_ACCEPTED: "CANCEL_ACCEPTED",
  CANCEL_REJECTED: "CANCEL_REJECTED",
  CANCELLED: "CANCELLED", // manual only After ACCEPT from Rest

  SERVED: "SERVED", // manual
};

module.exports = ITEM_STATUS;
