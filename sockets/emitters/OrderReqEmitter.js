const { emitter } = require(".");
const logger = require("../../utils/logger");
const EMTR_EVENT = require("../constants/emitter_events");
const SKT_EVENT = require("../constants/events");
const { getUserBySessionId } = require("../lib/skt_user");

const emit = async (orderReq) => {
  try {
    const socketUser = await getUserBySessionId(orderReq.rest_id);

    if (!Boolean(socketUser)) {
      throw new Error("There is no socket user associated with the id");
    }

    emitter.emit(
      EMTR_EVENT.SEND_MSG,
      socketUser.socket_id,
      SKT_EVENT.ODR_REQ,
      orderReq
    );

    logger.info(
      `[SKT] Order request has been successfully emitted to user, rest_id: ${socketUser.rest_room}`
    );
  } catch (err) {
    logger.error(
      `[SKT] cannot emit order request ${JSON.stringify(orderReq)}, ERR: ${err}`
    );
  }
};

module.exports = {
  /**
   * @summary Emits order request to the specified restuarant
   * @param {any} orderReq
   */
  emit,
};
