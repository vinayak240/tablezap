const mongoose = require("mongoose");

const SocketUserSchema = new mongoose.Schema({
  socket_id: {
    type: String,
    required: true,
    unique: true,
  },
  table_id: {
    type: String,
  },
  session_id: {
    type: String,
    required: true,
    unique: true,
  },
  rest_room: {
    type: String,
    required: true,
  },
});

module.exports = SocketUser = mongoose.model("socketuser", SocketUserSchema);
