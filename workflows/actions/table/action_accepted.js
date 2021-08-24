const { clone } = require("ramda");
const TABLE_STATUS = require("../../../constants/table_status");
const TableRequestPublisher = require("../../../messaging/publishers/TableRequestPublisher");
const { v4: uuidv4 } = require("uuid");
const { saveTableRequestForRestId } = require("./helpers");

const perform = async (payload) => {
  try {
    acceptedRequest = clone(payload);
    acceptedRequest.status = TABLE_STATUS.TABLE_ACTIVE;
    let result = await saveTableRequestForRestId(acceptedRequest);
    await TableRequestPublisher.publish(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = perform;
