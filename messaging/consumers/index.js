const OrderConsumer = require("./OrderConsumer");
const Logger = require("../../utils/logger");
const TableRequestConsumer = require("./TableRequestConsumer");
/**
 * Init all consumers before sending the messages
 */

module.exports = async () => {
  try {
    //   ### Order MQ Consumers ###
    await OrderConsumer.init();
    await TableRequestConsumer.init();

    Logger.info(`[MQ] All MQ Consumers have been initialized Successfully`);
  } catch (err) {
    Logger.error(`[MQ] Error initializing MQ Consumers`);
    Logger.error("", err);
  }
};
