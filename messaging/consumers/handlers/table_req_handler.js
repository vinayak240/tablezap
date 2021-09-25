const { MESSAGE_TYPE, END_PTS } = require("../../../constants/messages");
const Logger = require("../../../utils/logger");
const TableWorkflow = require("../../../workflows/table_workflow");
const TableErrorEmitter = require("../../../sockets/emitters/TableErrorEmitter");
const TableErrorHandler = require("../../../utils/error-handlers/table_error_handler");
const handle = async (msg) => {
  try {
    Logger.info(
      `[MQ] Table Message received from Order Service, MSG: ${msg.content.toString()}`
    );

    const qm = JSON.parse(msg.content.toString());

    if (qm.type === MESSAGE_TYPE.ERROR_MESSAGE) {
      //Emit the error to client
      Logger.error(
        `[MQ] Received a table error message from Order Service, ERR: ${qm.msg}`
      );
      await TableErrorEmitter.emit(qm.payload, qm.msg);
      return;
    }

    if (!Boolean(qm.payload)) {
      throw new Error("[MQ] Received table message with no payload detected");
    }

    await TableWorkflow.push(qm.payload);
  } catch (err) {
    let eqm = JSON.parse(msg.content.toString());
    Logger.error(
      `[MQ] Table message received cannot be processed, Table_id: ${eqm?.payload?.table_id}`
    );
    Logger.error("", err);
    TableErrorHandler.handle(err, eqm);
  }
};

module.exports = handle;
