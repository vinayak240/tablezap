const { emitter } = require(".");
const logger = require("../../utils/logger");
const EMTR_EVENT = require("../constants/emitter_events");
const SKT_EVENT = require("../constants/events");
const { MESSAGE_TYPE, END_PTS } = require("../../constants/messages");
const { getUserBySessionId } = require("../lib/skt_user");

const emit = async (order, errMsg) => {
  try {
    const socketUser = await getUserBySessionId(order.rest_id);

    if (!Boolean(socketUser)) {
      throw new Error("[SKT] There is no socket user associated with the id");
    }

    if (!Boolean(socketUser.rest_room)) {
      throw new Error(
        `[SKT] There is no restaurant id associated with user, id: ${socketUser.rest_room}`
      );
    }

    if (socketUser.rest_room !== order.rest_id) {
      throw new Error(
        `[SKT] Cannot emit, Invalid restaurant id detected with user, id: ${socketUser.rest_room}`
      );
    }

    const message = {
      type: MESSAGE_TYPE.ERROR_MESSAGE,
      msg: errMsg,
      payload: order,
      from: END_PTS.REST_SERV,
      to: END_PTS.RESTAURANT,
    };

    emitter.emit(
      EMTR_EVENT.SEND_MSG,
      socketUser.socket_id, //need to send err response to the restaurant
      SKT_EVENT.ODR_ERR,
      message
    );
  } catch (err) {
    logger.error(
      `[SKT] cannot emit order response ${JSON.stringify(order)}, ERR: ${err}`
    );
  }
};

module.exports = {
  /**
   * @summary Emits order error to the specified user
   * @param {any} order
   * @param {any} errMsg
   */
  emit,
};
