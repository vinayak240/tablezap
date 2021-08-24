const { clone } = require("ramda");
const TABLE_STATUS = require("../../../constants/table_status");
const TableRequestPublisher = require("../../../messaging/publishers/TableRequestPublisher");
const { saveTableRequestForRestId } = require("./helpers");

const perform = async (payload) => {
  try {
    rejectedRequest = clone(payload);
    rejectedRequest.status = TABLE_STATUS.TABLE_REJECTED;
    await TableRequestPublisher.publish(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
