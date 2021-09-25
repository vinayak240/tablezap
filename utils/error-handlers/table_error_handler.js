const Logger = require("../logger");
const { MESSAGE_TYPE } = require("../../constants/messages");
const OrderPublisher = require("../../messaging/publishers/OrderPublisher");
const Order = require("../../db/models/Order");
const {
  saveTableRequestForRestId,
} = require("../../workflows/actions/table/helpers");
const TABLE_STATUS = require("../../constants/table_status");
const TableRequestPublisher = require("../../messaging/publishers/TableRequestPublisher");

const handle = async (error, msg) => {
  try {
    let errorData = {
      status: msg.payload?.status,
      msg: error.message,
    };

    if (!Boolean(msg.payload)) {
      Logger.error("[IMPL] Cannot handle table error, Table request is null");
      return;
    }

    if (msg.type === MESSAGE_TYPE.RESPONSE_MESSAGE) {
      throw error;
    }

    if (msg.type === MESSAGE_TYPE.REQUEST_MESSAGE) {
      // Inform the Orded service about the error through mq
      msg.payload.status = TABLE_STATUS.TABLE_FREE;
      msg.payload.meta_info = {
        ...msg.payload.meta_info,
        is_error: true,
        errorData,
      };
      await saveTableRequestForRestId(msg.payload);

      await TableRequestPublisher.publish({
        type: MESSAGE_TYPE.ERROR_MESSAGE,
        msg: errorData.message,
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
