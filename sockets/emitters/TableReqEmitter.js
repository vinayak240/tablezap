const { emitter } = require(".");
const Logger = require("../../utils/logger");
const EMTR_EVENT = require("../constants/emitter_events");
const SKT_EVENT = require("../constants/events");
const { getUserBySessionId } = require("../lib/skt_user");

const emit = async (tableReq) => {
  try {
    const socketUser = await getUserBySessionId(tableReq.rest_id);

    if (!Boolean(socketUser)) {
      throw new Error("There is no socket user associated with the id");
    }

    emitter.emit(
      EMTR_EVENT.SEND_MSG,
      socketUser.socket_id,
      SKT_EVENT.TAB_REQ,
      tableReq
    );

    logger.info(
      `[SKT] Order request has been successfully emitted to user, rest_id: ${socketUser.rest_room}`
    );
  } catch (err) {
    Logger.error(
      `[SKT] cannot emit table request ${JSON.stringify(tableReq)}, ERR: ${err}`
    );
  }
};

module.exports = {
  /**
   * @summary Emits table request to the specified restuarant
   * @param {any} tableReq
   */
  emit,
};
