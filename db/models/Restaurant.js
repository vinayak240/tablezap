const mongoose = require("mongoose");
const Menu = require("./Menu");

const imgSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

const restSchema = new mongoose.Schema({
  /**
   * Restaurant's Id
   */
  rest_id: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  /**
   * Restaurant's name
   */
  rest_name: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's email
   */
  rest_email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  /**
   * Restaurant's password - encrypted hash salt
   */
  rest_psswd: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's display (Do not use)
   */
  display_images: [imgSchema],

  /**
   * Restaurant's address
   */
  rest_addr: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's phone/telephone number
   */
  rest_no: {
    type: String,
    required: true,
  },
  /**
   * Restaurant type (self service/service to table etc.)
   */
  rest_type: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's start timing
   */
  rest_timing_start: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's end timing
   */
  rest_timing_end: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's display tags
   */
  rest_tags: [
    {
      type: String,
    },
  ],
  /**
   * Restaurant's dine type (buffet/alacarte etc.)
   */
  dine_type: {
    type: String,
    required: true,
  },
  /**
   * Flag to determine whether restaurants serves alcohol
   */
  is_alcohol: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's owner name
   */
  owner_name: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's owner email
   */
  owner_email: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's owner phone number
   */
  owner_no: {
    type: String,
    required: true,
  },
  /**
   * Restaurant's registration date
   */
  date: {
    type: Date,
    default: Date.now,
  },
  /**
   * Restaurant's menu (food/alcohol/buffet etc.)
   */
  menu: {
    type: Menu,
  },
  /**
   * Restaurant's table orientation
   */
  orientation: {},
});

module.exports = Restaurant = mongoose.model("restaurant", restSchema);
