const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  rest_id: {
    type: String,
  },
  table_id: {
    type: String,
  },
  session_id: {
    type: String,
  },
  items: [],
  total_price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  offers: [],
  is_update: {
    type: Boolean, // Flag to determine whether to update the order to next status or not - not in case of Reject
  },
  // Should be filled by the client sides
  updated_order: {}, // Contains the orders next status and updates if any
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
