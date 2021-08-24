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
    res.status(400).json({
      success: false,
      msg: "Invalid Order Response",
    });
  }

  try {
    const result = await OrderWorkflow?.push(order);
    if (Boolean(result)) {
      Logger.info(`[IMPL] Order request accepted successfully`);
      res.status(200).json({
        success: true,
        msg: "Order has been accepted...",
        order: { ...result },
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(`[IMPL] Error on accepting Order, ERR : ${err}`);
    res.status(500).json({
      success: false,
      msg: "Cannot accept the order",
    });
  }
});

router.put("/update-accepted", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.UPDATE_ACCEPTED) {
    res.status(400).json({
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
        `[IMPL] Order update accepted successfully, id : ${result._id}`
      );
      res.status(200).json({
        success: true,
        msg: "Order update accepted",
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(
      `[IMPL] Error on Accepting Order Update Request, id : ${order._id} ERR: ${err}`
    );
    res.status(500).json({
      success: false,
      msg: "Cannot update the order",
    });
  }
});

router.delete("/cancel-accepted", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.CANCEL_ACCEPTED) {
    res.status(400).json({
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
        `[IMPL] Order cancel accepted successfully, id : ${result._id}`
      );
      res.status(200).json({
        success: true,
        msg: "Order cancel accepted",
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(
      `[IMPL] Error on Accepting Order Cancel Request, id : ${order._id}, ERR: ${err}`
    );
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
    res.status(400).json({
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
      Logger.info(`[IMPL] Order request rejected successfully`);
      res.status(200).json({
        success: true,
        msg: "Order has been rejected...",
        order: { ...result },
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(`[IMPL] Error on rejecting Order, ERR : ${err}`);
    res.status(500).json({
      success: false,
      msg: "Cannot accept the order",
    });
  }
});

router.put("/update-rejected/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.UPDATE_REJECTED) {
    res.status(400).json({
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
        `[IMPL] Order update rejected successfully, id : ${result._id}`
      );
      res.status(200).json({
        success: true,
        msg: "Order update accepted",
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(
      `[IMPL] Error on Rejecting Order Update Request, id : ${order._id} ERR: ${err}`
    );
    res.status(500).json({
      success: false,
      msg: "Cannot reject the order update",
    });
  }
});

router.delete("/cancel-rejected/", validateResponse, async (req, res) => {
  const order = req.body;

  if (order?.updated_order?.status !== ORDER_STATUS.CANCEL_REJECTED) {
    res.status(400).json({
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
        `[IMPL] Order cancel rejected successfully, id : ${result._id}`
      );
      res.status(200).json({
        success: true,
        msg: "Order cancel accepted",
      });
    } else {
      throw new Error("Workflow result empty");
    }
  } catch (err) {
    Logger.error(
      `[IMPL] Error on Rejecting Order Cancel Request, id : ${order._id}, ERR: ${err}`
    );
    res.status(500).json({
      success: false,
      msg: "Cannot reject the order cancel request",
    });
  }
});

//#endregion Reject Responses

module.exports = router;
