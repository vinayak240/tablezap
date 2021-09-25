const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  /**
   * Restaurant's Id from which the order is booked
   */
  rest_id: {
    type: String,
  },
  /**
   * Restaurant table Id
   */
  table_id: {
    type: String,
  },
  /**
   * Items ordered
   */
  items: [],
  /**
   * Net amount of the order
   */
  total_price: {
    type: String,
    required: true,
  },
  /**
   * Seesion ID which is maintained for each table
   */
  session_id: {
    type: String,
  },
  /**
   * Current order status
   */
  status: {
    type: String,
  },
  /**
   * Offers that have been applied on the order
   */
  offers: [],
  /**
   * Flag to determine whether to update the order to next status or not
   * - not in case of Reject
   */
  is_update: {
    type: Boolean,
  },
  /**
   * Contains all the rejected items
   */
  rejected_items: [],
  /**
   * Contains the updated order items
   * - NOTE: Should be filled properly from client side
   */
  updated_order: {},
  /**
   * Contains the status audit/history of the order
   */
  audit: [],
  /**
   * Contains the meta info about the order - if any
   */
  meta: {},
  /**
   * Specifies the order modified date/time
   */
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
