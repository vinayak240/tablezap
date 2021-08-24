const Joi = require("joi");
const TABLE_STATUS = require("../../constants/table_status");
const Logger = require("../../utils/logger");

const validate = async (tableRequest, isResponse = false) => {
  const tableRequest = req.body;
  try {
    const { error, value } = await build(isResponse).validateAsync(
      tableRequest
    );
    if (Boolean(error)) {
      throw new Error(JSON.stringify(error));
    }
    next();
  } catch (err) {
    Logger.error(
      `[IMPL] Error validating the Table Request from ${tableRequest?.rest_id} | ${tableRequest?.table_id} : ${err.message}`
    );

    res.status(400).json({
      success: false,
      msg: "Invalid table request",
    });
  }
};

//#region Schema Builders

const build = (isResponse) => {
  const schema = Joi.object().keys({
    rest_id: Joi.string().min(5).required(),

    table_id: Joi.string().required(),

    session_id: Joi.string().required(),

    meta_info: Joi.object().keys({
      cust_name: Joi.string().required(),
      phone: Joi.string().required(),
    }),

    status: Joi.string()
      .required()
      .valid(...getValidTableStatuses(isResponse)),
  });

  return schema;
};

const getValidTableStatuses = (isResponse = false) => {
  let statuses = [];

  if (isResponse) {
    statuses = [TABLE_STATUS.TABLE_ACCEPTED, TABLE_STATUS.TABLE_REJECTED];
  } else {
    statuses = [TABLE_STATUS.TABLE_REQUESTED];
  }

  return statuses;
};

//#endregion Schema Buikders

//#region Validators

const validateTableRequest = async (tableRequest) => {
  try {
    Logger.info(
      `[IMPL] Received a Table Request : ${JSON.stringify(tableRequest)}`
    );
    await validate(tableRequest, false);

    return true;
  } catch (err) {
    Logger.error(
      `[IMPL] Error validating the Table request from ${tableRequest?.rest_id} | ${tableRequest?.table_id} : ${err.message}`
    );

    throw err;
  }
};

const validateTableResponse = async (req, res, next) => {
  const tableRequest = req.body;
  try {
    Logger.info(
      `[IMPL] Received a Table Response : ${JSON.stringify(tableRequest)}`
    );
    await validate(tableRequest, true);

    next();
  } catch (err) {
    Logger.error(
      `[IMPL] Error validating the Table response from ${tableRequest?.rest_id} | ${tableRequest?.table_id} : ${err.message}`
    );

    res.status(400).json({
      success: false,
      msg: "Invalid table response",
    });
  }
};

//#endregion Validators

module.exports = {
  /**
   * @summary Validates incoming table requests
   */
  validateTableRequest,
  /**
   * @summary Validates incoming table responses
   */
  validateTableResponse,
};
