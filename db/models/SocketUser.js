const mongoose = require("mongoose");

const SocketUserSchema = new mongoose.Schema({
  /**
   * Socket's unique Id
   */
  socket_id: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * Table Id mapped to the Socket
   */
  table_id: {
    type: String,
  },
  /**
   * Unique session ID mapped to the Socket
   */
  session_id: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * Used to represent whether the skt user is authorized to order or not
   * - None in case of restaurant!
   */
  is_active: {
    type: Boolean,
    default: false,
  },
  /**
   * Corresponds to unique restaurant's  Id
   */
  rest_room: {
    type: String,
    required: true,
  },
});

module.exports = SocketUser = mongoose.model("socketuser", SocketUserSchema);
