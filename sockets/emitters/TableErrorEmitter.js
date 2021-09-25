const { emitter } = require(".");
const logger = require("../../utils/logger");
const EMTR_EVENT = require("../constants/emitter_events");
const SKT_EVENT = require("../constants/events");
const { MESSAGE_TYPE, END_PTS } = require("../../constants/messages");
const { getUserBySessionId } = require("../lib/skt_user");

const emit = async (tableReq, errMsg) => {
  // To be decided - if the user can connect skts before table req validation
  try {
    const socketUser = await getUserBySessionId(tableReq.rest_id);

    if (!Boolean(socketUser)) {
      throw new Error("There is no socket user associated with the id");
    }

    const message = {
      type: MESSAGE_TYPE.ERROR_MESSAGE,
      msg: errMsg,
      payload: tableReq,
      from: END_PTS.REST_SERV,
      to: END_PTS.RESTAURANT,
    };

    emitter.emit(
      EMTR_EVENT.SEND_MSG,
      socketUser.socket_id, //need to send response to all user in a table
      SKT_EVENT.TAB_ERR,
      message
    );
  } catch (err) {
    logger.error(
      `[SKT] cannot emit tableReq error ${JSON.stringify(
        tableReq
      )}, ERR: ${err}`
    );
  }
};

module.exports = {
  /**
   * @summary Emits tableReq error to the specified user
   * @param {any} tableReq
   * @param {any} errMsg
   */
  emit,
};
