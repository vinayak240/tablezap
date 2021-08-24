const SKT_EVENT = require("../constants/events");
const JoinRoomListener = require("./join_room");
const DisconnectListener = require("./disconnect");

const init = (io) => {
  io.on(SKT_EVENT.CONNECTION, (socket) => {
    // TO-DO: Add listeners for the small updates from the Restaurant eg: Item is Offline
    JoinRoomListener.listen(socket);
    DisconnectListener.listen(socket);
  });
};

module.exports = {
  /**
   * @summary Initializes all the Socket.io listeners
   * @param {any} io Socket io object
   */
  init,
};
