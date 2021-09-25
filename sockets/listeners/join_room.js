const Logger = require("../../utils/logger");
const SKT_EVENT = require("../constants/events");
const { joinRestaurant } = require("../lib/skt_user");

const listen = (socket) => {
  socket.on(SKT_EVENT.JOIN_REST_ROOM, async (data) => {
    try {
      const sktUser = await joinRestaurant(socket.id, data.rest_id);
      if (!Boolean(sktUser)) {
        new Error("Socket User is null");
      }
      socket.join(sktUser.rest_room || data.rest_id);

      Logger.debug(
        `[SKT] User has successfully joined the room: ${sktUser.rest_room}, id: ${sktUser.socket_id}`
      );
    } catch (err) {
      Logger.error(
        `[SKT] Cannot add the socket user entry to the DB, Continuing without it, ERR: ${err}`
      );
    }
  });
};

module.exports = { listen };
