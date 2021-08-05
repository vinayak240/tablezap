const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    // This is option namr
    type: String
    // required: true
  },
  option_price: {
    type: String
    // required: true
  },
  option_type: {
    type: String
    // required: true
  }
});

const custumizationSchema = new mongoose.Schema({
  custumization_name: {
    type: String
    // required: true
  },
  custum_type: {
    type: String
    // required: true
  },
  options: [optionSchema]
});

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String
    // required: true
  },
  item_img: {},
  item_price: {
    type: String
    // required: true
  },
  currency: {
    type: String
    // required: true
  },
  item_desc: {
    type: String
    // required: true
  },
  food_type: {
    type: String
    // required: true
  },
  custumization_arr: [custumizationSchema]
});

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  },

  items: [itemSchema]
});

const packageSchema = new mongoose.Schema({
  package_name: {
    type: String
    // required: true
  },
  package_price: {
    type: String
    // required: true
  },
  package_desc: {
    type: String
    // required: true
  },
  items: [itemSchema],
  custumization_arr: [custumizationSchema]
});

const menuSchema = new mongoose.Schema({
  food: [categorySchema],
  bar: [categorySchema],
  buffet: [packageSchema]
});

module.exports = menuSchema;
