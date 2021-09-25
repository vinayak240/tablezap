const router = require("express").Router({ mergeParams: true });
const ORDER_STATUS = require("../../../constants/order_status");
const {
  validateResponse,
} = require("../../../middleware/validators/order_validators");
const Logger = require("../../../utils/logger");
const OrderWorkflow = require("../../../workflows/order_workflow");

//#region Accept Responses

router.post("/order-accepted/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order.status !== ORDER_STATUS.ORDER_ACCEPTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(order);
    if (Boolean(result)) {
      Logger.info(`[API] Order request accepted successfully`);
      return res.status(200).json({
        success: true,
        msg: "Order has been accepted...",
        order: result,
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(`[API] (500) Cannot accept the Order, ERR: ${err}`);
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot accept the order",
    });
  }
});

router.put("/update-accepted", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.UPDATE_ACCEPTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(
      order,
      ORDER_STATUS.UPDATE_ACCEPTED
    );
    if (Boolean(result)) {
      Logger.info(
        `[API] Order update accepted successfully, id : ${result._id}`
      );
      return res.status(200).json({
        success: true,
        msg: "Order update accepted",
        order: result,
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(
      `[API] (500) Cannot accept the update order request, id : ${order._id}, ERR: ${err}`
    );
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot update the order",
    });
  }
});

router.delete("/cancel-accepted", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.CANCEL_ACCEPTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(
      order,
      ORDER_STATUS.CANCEL_ACCEPTED
    );
    if (Boolean(result)) {
      Logger.info(
        `[API] Order cancel accepted successfully, id : ${result._id}`
      );
      return res.status(200).json({
        success: true,
        msg: "Order cancel accepted",
        order: result,
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(
      `[API] (500) Cannot accept the cancel order request, id : ${order._id}, ERR: ${err}`
    );
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot cancel the order",
    });
  }
});

//#endregion Accept Responses

//#region Reject Responses

router.post("/order-rejected/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.ORDER_REJECTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(
      order,
      ORDER_STATUS.ORDER_REJECTED
    );
    if (Boolean(result)) {
      Logger.info(`[API] Order request rejected successfully`);
      return res.status(200).json({
        success: true,
        msg: "Order has been rejected...",
        order: result,
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(`[API] Cannot reject the order, ERR : ${err}`);
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot accept the order",
    });
  }
});

router.put("/update-rejected/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.UPDATE_REJECTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(
      order,
      ORDER_STATUS.UPDATE_REJECTED
    );
    if (Boolean(result)) {
      Logger.info(
        `[API] Order update rejected successfully, id : ${result._id}`
      );
      return res.status(200).json({
        success: true,
        msg: "Order update accepted",
        order: result,
      });
    }
    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(
      `[API] Cannot reject the update order request, id : ${order._id} ERR: ${err}`
    );
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot reject the order update",
    });
  }
});

router.delete("/cancel-rejected/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.CANCEL_REJECTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(
      order,
      ORDER_STATUS.CANCEL_REJECTED
    );
    if (Boolean(result)) {
      Logger.info(
        `[API] Order cancel rejected successfully, id : ${result._id}`
      );
      return res.status(200).json({
        success: true,
        msg: "Order cancel accepted",
        order: result,
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(
      `[API] (500) Cannot rejec the cancel order request, id : ${order._id}, ERR: ${err}`
    );
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot reject the order cancel request",
    });
  }
});

//#endregion Reject Responses

module.exports = router;
