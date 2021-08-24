const Logger = require("../../utils/logger");
const SKT_EVENT = require("../constants/events");
const { disconnectUser } = require("../lib/skt_user");

const listen = (socket) => {
  socket.on(SKT_EVENT.DISCONNECT, async () => {
    try {
      await disconnectUser(socket.id);

      Logger.debug(
        `[SKT] A user has been disconnected successfully, id: ${socket.id}`
      );
    } catch (err) {
      Logger.error(
        `[SKT] Cannot delete the socket user entry from the DB, Continuing without it, ERR: ${err}`
      );
    }
  });
};

module.exports = { listen };
