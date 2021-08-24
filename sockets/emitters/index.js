const Emitter = require("events").EventEmitter;
const EMTR_EVENT = require("../constants/emitter_events");
const em = new Emitter();

const init = (io) => {
  em.on(EMTR_EVENT.SEND_MSG, (id, evt, msg) => {
    io.to(id).emit(evt, msg);
  });
};

module.exports = {
  /**
   * Initializes all the event listeners to emit the messages
   * @param {any} io Socket io object
   */
  init,
  emitter: em,
};
