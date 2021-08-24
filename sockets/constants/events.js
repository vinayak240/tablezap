/**
 * @summary All the defined Socket Events
 */
const SKT_EVENT = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  /**
   * Event used to join a user to restaurant room
   */
  JOIN_REST_ROOM: "join-rest-room",
  /**
   * Event used to send order request to - from
   */
  ODR_REQ: "order-request-rs",
  /**
   * Event used to receive order response to - from [mostly used at OrderServ]
   */
  ODR_RES: "order-response-rs",
  /**
   * Event used to send table request to - from
   */
  TAB_REQ: "table-request-rs",
  /**
   * Event used to send table response to - from [mostly used at OrderServ]
   */
  TAB_RES: "table-response-rs",
};

module.exports = SKT_EVENT;
