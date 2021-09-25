const { MESSAGE_TYPE } = require("../../../constants/messages");
const Logger = require("../../../utils/logger");
const OrderWorkflow = require("../../../workflows/order_workflow");
const OrderErrorEmitter = require("../../../sockets/emitters/OrderErrorEmitter");
const OrderErrorHandler = require("../../../utils/error-handlers/order_error_handler");

const handle = async (msg) => {
  try {
    Logger.info(
      `[MQ] Order Message received from Order Service, MSG: ${msg.content.toString()}`
    );

    const qm = JSON.parse(msg.content.toString());

    if (qm.type === MESSAGE_TYPE.ERROR_MESSAGE) {
      //Emit the error to restaurant client
      await OrderErrorEmitter.emit(qm.payload, qm.msg);
      return;
    }

    if (!Boolean(qm.payload)) {
      throw new Error("[MQ] Order message with no payload detected");
    }
    await OrderWorkflow.push(qm.payload);
  } catch (err) {
    let eqm = JSON.parse(msg.content.toString());
    Logger.error(
      `[MQ] Order message received cannot be processed, order_id: ${
        eqm?.payload?._id ||
        `NEW (rest_id: ${eqm?.payload?.rest_id} | table_id: ${eqm?.payload?.table_id})`
      }`
    );
    Logger.error("", err);
    await OrderErrorHandler.handle(err, eqm);
  }
};

module.exports = handle;
