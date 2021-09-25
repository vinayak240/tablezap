const Logger = require("../logger");
const { MESSAGE_TYPE, END_PTS } = require("../../constants/messages");
const OrderPublisher = require("../../messaging/publishers/OrderPublisher");
const Order = require("../../db/models/Order");

const handle = async (error, msg) => {
  try {
    let errorData = {
      status: msg.payload?.status,
      msg: error.message,
    };

    if (!Boolean(msg.type)) {
      Logger.error(
        "[IMPL] Cannot handle order error, message type is not specified"
      );
      return;
    }

    if (!Boolean(msg.payload)) {
      Logger.error("[IMPL] Cannot handle order error, order is null");
      return;
    }

    if (msg.type === MESSAGE_TYPE.RESPONSE_MESSAGE) {
      return;
    }

    if (Boolean(msg.payload._id)) {
      let meta = {
        ...msg.payload.meta,
        is_error: true,
        error: errorData,
      };

      await Order.findOneAndUpdate(
        { _id: msg.payload._id },
        { $set: { meta } },
        { new: true, upsert: false }
      );
    }

    if (msg.type === MESSAGE_TYPE.REQUEST_MESSAGE) {
      // Inform the restaurant service about the error through mq
      await OrderPublisher.publish({
        type: MESSAGE_TYPE.ERROR_MESSAGE,
        msg: errorData.msg,
        payload: msg.payload,
      });
    }
  } catch (err) {
    Logger.error("", err);
  }
};

module.exports = {
  handle,
};
