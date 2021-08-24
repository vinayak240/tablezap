const TABLE_STATUS = require("../constants/table_status");
const performActionRelatedToAcceptStatus = require("./actions/table/action_accepted");
const performActionRelatedToRejectStatus = require("./actions/table/action_rejected");
const {
  validateTableRequest,
} = require("../middleware/validators/table_req_validator");
const TableReqEmitter = require("../sockets/emitters/TableReqEmitter");
const Logger = require("../utils/logger");

const push = async (payload) => {
  let actionResult = undefined;
  try {
    switch (payload.status) {
      case TABLE_STATUS.TABLE_REQUESTED:
        actionResult = await validateTableRequest(payload);
        TableReqEmitter.emit(payload);
        return actionResult;

      case TABLE_STATUS.TABLE_ACCEPTED:
        actionResult = await performActionRelatedToAcceptStatus(payload);
        return actionResult;

      case TABLE_STATUS.TABLE_REJECTED:
        actionResult = await performActionRelatedToRejectStatus(payload);
        return actionResult;

      case TABLE_STATUS.TABLE_FREE: // Triggered From restaurant
        // TO-DO: Probably update if needed, keep this wfw for now...
        return true;

      default:
        throw new Error("Invalid Table Status Detected!");
    }
  } catch (err) {
    Logger.error(
      `Error while executing Table Workflow STATUS: ${payload.status} : ${err}`
    );
    throw err;
  }
};

module.exports = {
  push: push,
};
