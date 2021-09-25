const TABLE_STATUS = require("../constants/table_status");
const performActionRelatedToAcceptStatus = require("./actions/table/action_accepted");
const performActionRelatedToRejectStatus = require("./actions/table/action_rejected");
const {
  validateTableRequest,
} = require("../middleware/validators/table_req_validator");
const TableReqEmitter = require("../sockets/emitters/TableReqEmitter");
const Logger = require("../utils/logger");

const push = async (tableReq) => {
  let actionResult = undefined;
  try {
    switch (tableReq.status) {
      case TABLE_STATUS.TABLE_REQUESTED:
        // throw new Error("[TEST] Random error to test the error handlers");
        actionResult = await validateTableRequest(tableReq);
        await TableReqEmitter.emit(tableReq, false, "Table requested");
        return actionResult;

      case TABLE_STATUS.TABLE_ACCEPTED:
        actionResult = await performActionRelatedToAcceptStatus(tableReq);
        return actionResult;

      case TABLE_STATUS.TABLE_REJECTED:
        actionResult = await performActionRelatedToRejectStatus(tableReq);
        return actionResult;

      case TABLE_STATUS.TABLE_FREE: // Triggered From restaurant
        // TO-DO: Probably update if needed, keep this wfw for now...
        return true;

      default:
        throw new Error("Invalid Table Status Detected!");
    }
  } catch (err) {
    Logger.error(
      `Error while executing Table Workflow STATUS: ${tableReq.status}`
    );

    throw err;
  }
};

module.exports = {
  push: push,
};
