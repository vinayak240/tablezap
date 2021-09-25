const { clone } = require("ramda");
const logger = require("../.../../../../utils/logger");
const Restaurant = require("../../../db/models/Restaurant");

const getTablesForRestId = async (request) => {
  try {
    const result = await Restaurant.findOne(
      {
        _id: request.rest_id,
      },
      { projection: { orientation: 1 } }
    );
    const { orientation } = result;
    if (
      !Boolean(orientation?.tables) ||
      !Boolean(orientation?.tables?.length > 0)
    ) {
      throw new Error("No Tables found");
    }

    return clone(orientation.tables);
  } catch (err) {
    logger.error(`[DB] Error retrieving Restaurant Tables, ERR: ${err}`);
    throw err;
  }
};

const saveTableRequestForRestId = async (request) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: request.rest_id,
    });

    restaurant.orientation.tables = restaurant.orientation.tables.map((tab) => {
      if (request.table_id === tab.table_id) {
        return {
          ...tab,
          status: request.status,
          meta_info: request.meta_info,
          session_id: request.session_id,
        };
      }
      return tab;
    });

    const payload = { orientation: { ...restaurant.orientation } };

    await Restaurant.findOneAndUpdate(
      { _id: restaurant._id },
      { $set: payload }
    );

    return request;
  } catch (err) {
    logger.error(`[DB] Error retrieving Restaurant Tables, ERR: ${err}`);
    throw err;
  }
};

module.exports = {
  getTablesForRestId,
  saveTableRequestForRestId,
};
