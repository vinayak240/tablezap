const Joi = require("joi");
const ORDER_STATUS = require("../../constants/order_status");
const Logger = require("../../utils/logger");

const validate = async (
  order,
  isResponse = false,
  validateMetaInfo = false
) => {
  try {
    Logger.info(`[IMPL] Received a Order : ${JSON.stringify(order)}`);
    const { error, value } = await Joi.object()
      .keys(build(order.status, isResponse, validateMetaInfo))
      .validateAsync(order);

    if (Boolean(error)) {
      throw new Error(JSON.stringify(error));
    }
  } catch (err) {
    Logger.error(
      `[IMPL] Error validating the Order from ${order?.rest_id} | ${order?.table_id} : ${err}`
    );
    throw err;
  }
};

//#region Schema Builder

const build = (status, isResponse, validateMetaInfo) => {
  let keys = {
    _id: Joi.string(),

    rest_id: Joi.string().min(5).required(),

    table_id: Joi.string().required(),

    items: Joi.array().min(1).required(),

    rejected_items: Joi.array(),

    total_price: Joi.string().required(),

    offers: Joi.array(),

    is_update: Joi.boolean().required(),

    updated_order: Joi.any(),

    audit: Joi.array(),

    session_id: Joi.string(),

    status: Joi.string()
      .required()
      .valid(...getValidOrderStatus(isResponse)),

    date: Joi.date(),
    __v: Joi.any(),
  };

  if (validateMetaInfo) {
    if (status === ORDER_STATUS.UPDATE) {
      keys.updated_order = Joi.object().keys({
        status: Joi.string().required(),
        items: Joi.array().required(),
        offers: Joi.array(),
        total_price: Joi.string().required(),
        date: Joi.date(),
      });
    } else {
      keys.updated_order = Joi.object().keys({
        status: Joi.string().required(),
        items: Joi.array(),
        offers: Joi.array(),
        total_price: Joi.string(),
        date: Joi.date(),
      });
    }
  }

  return keys;
};

const getValidOrderStatus = (isResponse) => {
  let statuses = [];

  if (isResponse) {
    statuses = [
      ORDER_STATUS.ORDER_ACCEPTED,
      ORDER_STATUS.UPDATE_ACCEPTED,
      ORDER_STATUS.CANCEL_ACCEPTED,
      ORDER_STATUS.ORDER_REJECTED,
      ORDER_STATUS.UPDATE_REJECTED,
      ORDER_STATUS.CANCEL_REJECTED,
    ];
  } else {
    statuses = [ORDER_STATUS.PLACED, ORDER_STATUS.UPDATE, ORDER_STATUS.CANCEL];
  }

  return statuses;
};

//#endregion Schema Builder

//#region Validators

const validateRequest = async (req, res, next) => {
  const order = req.body;

  try {
    if (order.status === ORDER_STATUS.PLACED) {
      await validate(order);
    } else {
      await validate(order, false, true);
    }
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "Invalid order request",
    });
  }
};

const validateResponse = async (req, res, next) => {
  const order = req.body;

  try {
    if (
      [ORDER_STATUS.ORDER_ACCEPTED, ORDER_STATUS.ORDER_REJECTED].includes(
        order.status
      )
    ) {
      await validate(order, true);
    } else {
      await validate(order, true, true);
    }
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "Invalid order response",
    });
  }
};

const validateOrder = async (order, isResponse) => {
  try {
    if (
      [
        ORDER_STATUS.ORDER_ACCEPTED,
        ORDER_STATUS.ORDER_REJECTED,
        ORDER_STATUS.PLACED,
      ].includes(order.status)
    ) {
      await validate(order, isResponse);
    } else {
      await validate(order, isResponse, true);
    }

    return true;
  } catch (err) {
    throw err;
  }
};

//#endregion Validators

module.exports = {
  /**
   * @summary Validates incoming order requests
   */
  validateRequest,

  /**
   * @summary Validates order responses
   */
  validateResponse,

  /**
   * @summary Validates order object
   */
  validateOrder,
};
