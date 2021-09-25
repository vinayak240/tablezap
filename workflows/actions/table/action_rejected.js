const { clone } = require("ramda");
const { MESSAGE_TYPE } = require("../../../constants/messages");
const TABLE_STATUS = require("../../../constants/table_status");
const TableRequestPublisher = require("../../../messaging/publishers/TableRequestPublisher");
const { saveTableRequestForRestId } = require("./helpers");

const perform = async (payload) => {
  try {
    rejectedRequest = clone(payload);
    rejectedRequest.status = TABLE_STATUS.TABLE_REJECTED;
    await saveTableRequestForRestId(rejectedRequest);
    await TableRequestPublisher.publish({
      type: MESSAGE_TYPE.RESPONSE_MESSAGE,
      msg: "Table request rejected",
      payload: rejectedRequest,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
