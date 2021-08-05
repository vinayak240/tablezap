const { RESTSERV_TAB_REQ_QUEUE } = require("../constants/queues");
const config = require("../../config/app.config");
const amqp = require("amqplib");
const { TABLE_REQUEST_EXCHANGE } = require("../constants/exchanges");
const { ORDERSERV_TO_RESTSERV_TAB_REQ } = require("../constants/keys");
const Logger = require("../../utils/logger");

const initTableRequestConsumer = async () => {
  try {
    const conn = await amqp.connect(process.env.LOCAL_MQ_URL);
    const ch = await conn.createChannel();
    ch.prefetch(config.app["messaging"]["channelPreFetchCount"]);
    await ch.assertExchange(TABLE_REQUEST_EXCHANGE, "direct", {
      durable: true,
    });

    await ch.assertQueue(RESTSERV_TAB_REQ_QUEUE, {
      durable: true,
    });

    await ch.bindQueue(
      RESTSERV_TAB_REQ_QUEUE,
      TABLE_REQUEST_EXCHANGE,
      ORDERSERV_TO_RESTSERV_TAB_REQ
    );

    await ch.consume(
      RESTSERV_TAB_REQ_QUEUE,
      (msg) => {
        Logger.info(
          `[MQ] Table Request Message received from Order Service MSG: ${msg.content.toString()}`
        );
      },
      {
        noAck: true,
      }
    );
  } catch (err) {
    Logger.error(
      `[MQ] Error initializing Table Request MQ Consumer at QUEUE: ${RESTSERV_TAB_REQ_QUEUE}, ERR: ${err}`
    );
    throw err;
  }
};

module.exports = {
  /**
   * @summary method to init the consumer to consume table request messages
   */
  init: initTableRequestConsumer,
  /**
   * @summary RestaurantService Table Request Queue
   */
  queue: RESTSERV_TAB_REQ_QUEUE,
};
