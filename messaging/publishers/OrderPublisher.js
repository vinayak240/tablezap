const Logger = require("../../utils/logger");
const { ORDERS_EXCHANGE } = require("../constants/exchanges");
const { RESTSERV_TO_ORDERSERV } = require("../constants/keys");
const { ORDERSERV_ORDERS_QUEUE } = require("../constants/queues");
const publisher = require("./publish");

const publishOrder = async (msg) => {
  try {
    Logger.info(`[MQ] Publishing order message : ${JSON.stringify(msg)}`);
    await publisher.publish_exchange(
      ORDERS_EXCHANGE,
      ORDERSERV_ORDERS_QUEUE,
      RESTSERV_TO_ORDERSERV,
      msg
    );
    Logger.info(
      `[MQ] Order message publish successful to OrderService: ${JSON.stringify(
        msg
      )}`
    );
  } catch (err) {
    Logger.error(`[MQ] Error while publishing order message : ${err.message}`);
    throw err;
  }
};

module.exports = {
  /**
   * @summary method to publish the order messages to OrderService's MQ
   * - RestaurantService ------> OrderService
   * @param msg Order Message
   * @returns Boolean , Whether the message publish was success or not..
   */
  publish: publishOrder,

  /**
   * @summary OrderService Order Queue
   */
  queue: ORDERSERV_ORDERS_QUEUE,
};
