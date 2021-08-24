const {
  ORDER_ACCEPTED,
  UPDATE_ACCEPTED,
  CANCEL_ACCEPTED,
  ORDER_REJECTED,
  UPDATE_REJECTED,
  CANCEL_REJECTED,
  PLACED,
  UPDATE,
  CANCEL,
} = require("../constants/order_status");
const OrderReqEmitter = require("../sockets/emitters/OrderReqEmitter");
const performActionRelatedToOrderAcceptedStatus = require("./actions/order/action_order_accepted");
const performActionRelatedToUpdateAcceptedStatus = require("./actions/order/action_update_accepted");
const performActionRelatedToCancelAcceptedStatus = require("./actions/order/action_cancel_accepted");
const performActionRelatedToRejectedStatus = require("./actions/order/action_rejected");
const Logger = require("../utils/logger");
const { validateOrder } = require("../middleware/validators/order_validators");

const push = async (payload, metaStatus) => {
  let actionResult = undefined;
  try {
    switch (metaStatus || payload.status) {
      case PLACED:
      case UPDATE:
      case CANCEL:
        actionResult = await validateOrder(payload, false);
        OrderReqEmitter.emit(payload);
        return actionResult;

      case ORDER_ACCEPTED:
        actionResult = await performActionRelatedToOrderAcceptedStatus(payload);
        return actionResult;

      case UPDATE_ACCEPTED:
        actionResult = await performActionRelatedToUpdateAcceptedStatus(
          payload
        );
        return actionResult;

      case CANCEL_ACCEPTED:
        actionResult = await performActionRelatedToCancelAcceptedStatus(
          payload
        );
        return actionResult;

      case ORDER_REJECTED:
      case UPDATE_REJECTED:
      case CANCEL_REJECTED:
        actionResult = await performActionRelatedToRejectedStatus(
          payload,
          metaStatus || payload.status
        );
        return actionResult;

      default:
        throw new Error("Invalid Order Status Detected!");
    }
  } catch (err) {
    Logger.error(
      `Error while executing Order Workflow, STATUS: ${payload.status} : ${err.message}`
    );
    throw err;
  }
};

module.exports = {
  push,
};
