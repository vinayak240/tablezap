const mongoose = require("mongoose");
const Menu = require("./Menu");
// console.log("Schema : ", Menu);

const imgSchema = new mongoose.Schema({
  name: {
    type: String
    // required: true
  },
  imgURL: {
    type: String
    // required: true
  }
});

const restSchema = new mongoose.Schema({
  rest_id: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  rest_name: {
    type: String,
    required: true
  },
  rest_email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  rest_psswd: {
    type: String,
    required: true
  },
  display_images: [imgSchema],
  rest_addr: {
    type: String,
    required: true
  },
  rest_no: {
    type: String,
    required: true
  },
  rest_type: {
    type: String,
    required: true
  },
  rest_timing_start: {
    type: String,
    required: true
  },
  rest_timing_end: {
    type: String,
    required: true
  },
  rest_tags: [
    {
      type: String
    }
  ],
  dine_type: {
    type: String,
    required: true
  },
  is_alcohol: {
    type: String,
    required: true
  },
  owner_name: {
    type: String,
    required: true
  },
  owner_email: {
    type: String,
    required: true
  },
  owner_no: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  menu: {
    type: Menu
  },
  orientation: {}
});

// const packageSchema = new mongoose.Schema({
//   package_name: {
//     type: String,
//     // required: true
//   },
//   package_price: {
//     type: String,
//     // required: true
//   },
//   package_desc: {
//     type: String,
//     // required: true
//   },
//   items: [

//   ],
//   custumization_arr: [

//   ]

// })

// const itemSchema = new mongoose.Schema({
//   item_name: {
//     type: String,
//     // required: true
//   },
//   item_price: {
//     type: String,
//     // required: true
//   },
//   currency: {
//     type: String,
//     // required: true
//   },
//   item_desc: {
//     type: String,
//     // required: true
//   },
//   food_type: {
//     type: String,
//     // required: true
//   },
//   custumization_arr: [

//   ]
// })

// const custumizationSchema = new mongoose.Schema({
//   custumization_name: {
//     type: String,
//     // required: true
//   },
//   custum_type: {
//     type: String,
//     // required: true
//   },
//   options: [

//   ]
// })

// const optionSchema = new mongoose.Schema({
//   option: {
//     // This is option namr
//     type: String,
//     // required: true
//   },
//   option_price: {
//     type: String,
//     // required: true
//   },
//   option_type: {
//     type: String,
//     // required: true
//   },
// })

module.exports = Restaurant = mongoose.model("restaurant", restSchema);

// menu: {food: Array(1), bar: Array(1), buffet: Array(1)}
// orientation: {service_type: "3", n_tables: 2, tables: Array(2)}
