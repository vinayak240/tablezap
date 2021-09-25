const router = require("express").Router({ mergeParams: true });
const TABLE_STATUS = require("../../../constants/table_status");
const {
  validateTableResponse,
} = require("../../../middleware/validators/table_req_validator");
const Logger = require("../../../utils/logger");
const TableWorkflow = require("../../../workflows/table_workflow");

//#region Accept Responses

router.post("/accepted/", validateTableResponse, async (req, res) => {
  const tableReq = req.body;

  if (tableReq.status !== TABLE_STATUS.TABLE_ACCEPTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Table Response",
    });
  }

  try {
    const result = await TableWorkflow?.push(tableReq);
    if (Boolean(result)) {
      Logger.info(`[API] Table request accepted successfully`);
      return res.status(200).json({
        success: true,
        msg: "Table request has been accepted...",
        request: { ...result },
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(`[API] (500) Cannot accept table request, ERR : ${err}`);
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot accept the request",
    });
  }
});

//#endregion Accept Responses

//#region Reject Responses

router.delete("/rejected/", validateTableResponse, async (req, res) => {
  const tableReq = req.body;

  if (tableReq.status !== TABLE_STATUS.TABLE_REJECTED) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Table Response",
    });
  }

  try {
    const result = await TableWorkflow?.push(tableReq);

    if (Boolean(result)) {
      Logger.info(`[API] Table request rejected successfully`);
      return res.status(200).json({
        success: true,
        msg: "Table request has been rejected...",
        request: { ...result },
      });
    }

    throw new Error("Workflow result empty");
  } catch (err) {
    Logger.error(`[API] (500) Cannot reject table  request, ERR : ${err}`);
    Logger.error("[API] ", err);
    res.status(500).json({
      success: false,
      msg: "Cannot reject the request",
    });
  }
});

//#endregion Reject Responses

module.exports = router;
