/**
 * @summary All the defined Order Statuses
 * - the statuses marked manual are triggered manaully
 * - the semi statuses are only there in the server
 */
const ORDER_STATUS = {
  NEW: "NEW", //manual - semi status
  PLACED: "PLACED",
  ORDER_ACCEPTED: "ORDER_ACCEPTED", //manual for accepted order only After ACCEPT from Rest
  ORDER_REJECTED: "ORDER_REJECTED",
  PREPARING: "PREPARING",

  UPDATE: "UPDATE", //manual
  UPDATE_ACCEPTED: "UPDATE_ACCEPTED",
  UPDATE_REJECTED: "UPDATE_REJECTED",
  UPDATED: "UPDATED", //manual only After ACCEPT from Rest

  CANCEL: "CANCEL", //manual
  CANCEL_ACCEPTED: "CANCEL_ACCEPTED",
  CANCEL_REJECTED: "CANCEL_REJECTED",
  CANCELLED: "CANCELLED", //manual only After ACCEPT from Rest

  SERVED: "SERVED", //manual -- last stage
  CLOSED: "CLOSED", // manual - After customer checks out all his current table orders(In Status SERVED) will be CLOSED (Triggered by rest)
};

module.exports = ORDER_STATUS;
