/**
 * @summary All the defined Event Emitter Events
 */
const EMTR_EVENT = {
  /**
   * Event used to emit a message to skt-io to send a msg to socket/room
   */
  SEND_MSG: "emitter-send-msg",

  /**
   * Event used to emit a message to skt-io to broadcast a msg
   */
  BROADCAST_MSG: "emitter-broadcast-msg",
};

module.exports = EMTR_EVENT;
