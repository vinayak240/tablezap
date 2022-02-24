const OrderReqEmitter = require("../sockets/emitters/OrderReqEmitter");
const performActionRelatedToOrderAcceptedStatus = require("./actions/order/action_order_accepted");
const performActionRelatedToUpdateAcceptedStatus = require("./actions/order/action_update_accepted");
const performActionRelatedToCancelAcceptedStatus = require("./actions/order/action_cancel_accepted");
const performActionRelatedToRejectedStatus = require("./actions/order/action_rejected");
const Logger = require("../utils/logger");
const { validateOrder } = require("../middleware/validators/order_validators");
const ORDER_STATUS = require("../constants/order_status");

const push = async (order, updatedStatus) => {
  let actionResult = undefined;
  try {
    // Add Update Order flow to update each item status
    switch (updatedStatus || order.status) {
      case ORDER_STATUS.PLACED:
      case ORDER_STATUS.UPDATE:
      case ORDER_STATUS.CANCEL:
        // throw new Error("Random error to test Order Error Emitter");
        actionResult = await validateOrder(order, false);
        OrderReqEmitter.emit(order, "New order request");
        return actionResult;

      case ORDER_STATUS.ORDER_ACCEPTED:
        actionResult = await performActionRelatedToOrderAcceptedStatus(order);
        return actionResult;

      case ORDER_STATUS.UPDATE_ACCEPTED:
        actionResult = await performActionRelatedToUpdateAcceptedStatus(order);
        return actionResult;

      case ORDER_STATUS.CANCEL_ACCEPTED:
        actionResult = await performActionRelatedToCancelAcceptedStatus(order);
        return actionResult;

      case ORDER_STATUS.ORDER_REJECTED:
      case ORDER_STATUS.UPDATE_REJECTED:
      case ORDER_STATUS.CANCEL_REJECTED:
        actionResult = await performActionRelatedToRejectedStatus(
          order,
          updatedStatus || order.status
        );
        return actionResult;

      default:
        throw new Error("Invalid Order Status Detected!");
    }
  } catch (err) {
    Logger.error(
      `Error while executing Order Workflow, STATUS: ${order.status}`
    );
    throw err;
  }
};

module.exports = {
  push,
};
