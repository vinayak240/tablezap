const { RESTSERV_ORDERS_QUEUE } = require("../constants/queues");
const config = require("../../config/app.config");
const amqp = require("amqplib");
const { ORDERS_EXCHANGE } = require("../constants/exchanges");
const { ORDERSERV_TO_RESTSERV } = require("../constants/keys");
const OrderWorkflow = require("../../workflows/order_workflow");
const Logger = require("../../utils/logger");

const initOrderConsumer = async () => {
  try {
    const conn = await amqp.connect(
      config.app["messaging"]["mqUrl"] || process.env.LOCAL_MQ_URL
    );
    const ch = await conn.createChannel();
    ch.prefetch(config.app["messaging"]["channelPreFetchCount"]);
    await ch.assertExchange(ORDERS_EXCHANGE, "direct", {
      durable: true,
    });

    await ch.assertQueue(RESTSERV_ORDERS_QUEUE, {
      durable: true,
    });

    await ch.bindQueue(
      RESTSERV_ORDERS_QUEUE,
      ORDERS_EXCHANGE,
      ORDERSERV_TO_RESTSERV
    );

    await ch.consume(
      RESTSERV_ORDERS_QUEUE,
      (msg) => {
        Logger.info(
          `[MQ] Order Message received from Order Service, MSG: ${msg.content.toString()}`
        );
        const qm = JSON.parse(msg.content.toString());
        OrderWorkflow.push(qm);
      },
      {
        noAck: true,
      }
    );
  } catch (err) {
    Logger.error(
      `[MQ] Error initializing Order MQ Consumer at QUEUE: ${RESTSERV_ORDERS_QUEUE}, ERR: ${err}`
    );
    throw err;
  }
};

module.exports = {
  /**
   * @summary method to init the consumer to consume order messages from order service
   */
  init: initOrderConsumer,
  /**
   * @summary OrderService Order Queue
   */
  queue: RESTSERV_ORDERS_QUEUE,
};
