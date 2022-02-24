const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  /**
   * Custumoization's option name
   */
  option: {
    type: String,
  },
  /**
   * Custumoization's option food type
   */
  food_type: {
    type: String,
  },
  /**
   * Custumoization's option price
   */
  option_price: {
    type: String,
  },
  /**
   * Custumoization's option type (to add or to deduct option's price or becomes the item cost)
   */
  option_type: {
    type: String,
  },
});

const custumizationSchema = new mongoose.Schema({
  /**
   * Custumoization's name
   */
  custumization_name: {
    type: String,
    // required: true
  },
  /**
   * Custumoization's type
   */
  custum_type: {
    type: String,
    // required: true
  },
  /**
   * Custumoization's options
   */
  options: [optionSchema],
});

const itemSchema = new mongoose.Schema(
  { type: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const categorySchema = new mongoose.Schema({
  /**
   * Menu's category name
   */
  category_name: {
    type: String,
    required: true,
  },
  /**
   * Menu's category type [sub_menu/category]
   * Hierarchy - menu has sub_menu[Has only category] / Categories
   */
  type: {
    type: String,
  },
  /**
   * Menu category's items
   */
  items: [itemSchema],
});

const packageSchema = new mongoose.Schema({
  /**
   * Buffet package's name
   */
  package_name: {
    type: String,
  },
  /**
   * Menu's package type [sub_menu/package]
   * Hierarchy - menu has sub_menu[Has only Packages] / Packages
   */
  type: {
    type: String,
  },
  /**
   * Buffet package's price
   */
  package_price: {
    type: String,
    // required: true
  },
  /**
   * Buffet package's description
   */
  package_desc: {
    type: String,
  },
  /**
   * Buffet package's items
   */
  items: [itemSchema],
  /**
   * Buffet package's custumizations
   */
  custumization_arr: [custumizationSchema],
});

const menuSchema = new mongoose.Schema({
  food: [categorySchema],
  bar: [categorySchema],
  buffet: [packageSchema],
});

module.exports = menuSchema;
