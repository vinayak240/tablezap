/**
 * @summary All the defined Table Statuses
 * - the statuses marked manual are triggered manaully
 */
const TABLE_STATUS = {
  TABLE_REQUEST: "TABLE_REQUEST", //manual
  TABLE_REQUESTED: "TABLE_REQUESTED",
  TABLE_ACCEPTED: "TABLE_ACCEPTED",
  TABLE_REJECTED: "TABLE_REJECTED",

  TABLE_ACTIVE: "TABLE_ACTIVE", // When table request is accepted the table status is set to TABLE_ACTIVE
  TABLE_FREE: "TABLE_FREE", //After checkout the rest table status is set to FREE
};

module.exports = TABLE_STATUS;
