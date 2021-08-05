const amqplib = require("amqplib");

/**
 * @summary A gerneric method to publish messages to specified queue
 * @param queue Queue to which the message is published
 * @param msg Message to be sent
 */
const publish_queue = async (queue, msg) => {
  try {
    if (!Boolean(queue) && typeof queue !== "string") {
      throw new Error("There is no MessageOueue Provided");
    }
    const conn = await amqplib.connect(
      process.env.LOCAL_MQ_URL || "amqp://localhost"
    );
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, {
      durable: true,
    });
    const qm = JSON.stringify(msg);
    ch.sendToQueue(queue, Buffer.from(qm, "utf8"));

    setTimeout(function () {
      ch.close();
      conn.close();
    }, 600);
  } catch (err) {
    throw err;
  }
};

/**
 * @summary A gerneric method to publish messages to exchange with a binding Key
 * @param exchange Exchange to which the message is published
 * @param queue Queue to which the msg is published
 * @param key Key to which the Queue is binded
 * @param msg Message to be sent
 */
const publish_exchange = async (exchange, queue, key, msg) => {
  try {
    if (!Boolean(exchange) && typeof exchange !== "string") {
      throw new Error("There is no Exchange Provided");
    }
    const conn = await amqplib.connect(process.env.LOCAL_MQ_URL);
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, "direct", {
      durable: true,
    });

    await ch.assertQueue(queue, {
      durable: true,
    });

    await ch.bindQueue(queue, exchange, key);

    const qm = JSON.stringify(msg);
    ch.publish(exchange, key, Buffer.from(qm, "utf8"));

    setTimeout(function () {
      ch.close();
      conn.close();
    }, 600);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  publish_queue: publish_queue,
  publish_exchange: publish_exchange,
};
