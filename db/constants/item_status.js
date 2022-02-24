/**
 * @summary All the defined Item Statuses
 */
const ITEM_STATUS = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",

  CANCEL: "CANCEL", // manual
  CANCEL_ACCEPTED: "CANCEL_ACCEPTED", // DONT USE
  CANCEL_REJECTED: "CANCEL_REJECTED", // DONT USE
  CANCELLED: "CANCELLED", // manual only After ACCEPT from Rest

  SERVED: "SERVED", // manual
};

module.exports = ITEM_STATUS;
