const { END_PTS } = require("../../constants/messages");
const Logger = require("../../utils/logger");
const { TABLE_REQUEST_EXCHANGE } = require("../constants/exchanges");
const { RESTSERV_TO_ORDERSERV_TAB_REQ } = require("../constants/keys");
const {
  RESTSERV_TAB_REQ_QUEUE,
  ORDERSERV_TAB_REQ_QUEUE,
} = require("../constants/queues");
const publisher = require("./publish");

const publishTableRequest = async (msg) => {
  try {
    Logger.info(
      `[MQ] Publishing table request message : ${JSON.stringify(msg)}`
    );
    msg = { ...msg, from: END_PTS.REST_SERV, to: END_PTS.ORDER_SERV };
    await publisher.publish_exchange(
      TABLE_REQUEST_EXCHANGE,
      ORDERSERV_TAB_REQ_QUEUE,
      RESTSERV_TO_ORDERSERV_TAB_REQ,
      msg
    );
    Logger.info(
      `[MQ] Table Request message publish successful to OrderService : ${JSON.stringify(
        msg
      )}`
    );
  } catch (err) {
    Logger.error(
      `[MQ] Error while publishing table request message : ${err.message}`
    );
    throw err;
  }
};

module.exports = {
  /**
   * @summary method to publish the Table Request messages to MQ
   * - OrderService ------> RestaurantServiceQueue
   * @param msg Table Request Message
   */
  publish: publishTableRequest,

  /**
   * @summary OrderService Table Request Queue
   */
  queue: RESTSERV_TAB_REQ_QUEUE,
};
