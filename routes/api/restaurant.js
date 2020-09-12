/*jshint esversion: 9 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const rest_auth = require("../../middleware/rest_auth");
const { check, validationResult } = require("express-validator/check");

const Restaurant = require("../../models/Restaurant");

// @route    GET restaurants/
// @desc     Get all restaurants
// @access   Public

router.get("/", async (req, res) => {
  try {
    let restaurants = await Restaurant.find().select(
      "_id rest_name rest_tags rest_timing_start rest_timing_end rest_type dine_type"
    );
    if (!restaurants) {
      return res
        .status(400)
        .json({ success: false, msg: "There is no entry for this restaurant" });
    }

    res.json({ success: true, restaurants });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// @route    POST restaurants/register
// @desc     Register restaurant
// @access   Public

router.post(
  "/register",
  [
    check("rest_name", "Name is required")
      .not()
      .isEmpty(),
    check("rest_id", "Restaurant ID is required")
      .not()
      .isEmpty(),
    check("rest_email", "Please include a valid email").isEmail(),
    check(
      "rest_psswd",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array()
      });
    }

    const { rest_id, rest_name, rest_psswd } = req.body;

    try {
      let restaurant = await Restaurant.findOne({ rest_id });

      if (restaurant) {
        return res.status(400).json({
          success: false,
          msg: "Restaurant with this ID already exists"
        });
      }

      restaurant = await Restaurant.findOne({ rest_name });

      if (restaurant) {
        return res.status(400).json({
          success: false,
          msg: "Restaurant with this name already exists"
        });
      }

      restaurant = new Restaurant({
        ...req.body
      });

      const salt = await bcrypt.genSalt(10);

      restaurant.rest_psswd = await bcrypt.hash(rest_psswd, salt);

      await restaurant.save();

      const payload = {
        restaurant
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ success: true, token, rest_name });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
);

// @route    POST /restaurants/login
// @desc     Login restaurant & get token
// @access   Public
router.post(
  "/login",
  [
    check("rest_id", "Please include a valid Restaurant ID")
      .not()
      .isEmpty(),
    check("rest_psswd", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array()
      });
    }

    const { rest_id, rest_psswd } = req.body;

    try {
      let restaurant = await Restaurant.findOne({ rest_id });

      if (!restaurant) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(rest_psswd, restaurant.rest_psswd);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Credentials" });
      }

      const payload = {
        restaurant: {
          _id: restaurant._id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          // Here
          if (err) throw err;
          res.json({ success: true, token, rest_name: restaurant.rest_name });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
);

// @route    GET /restaurants/rest
// @desc     To get the restaurant
// @access   Private
router.get("/rest", rest_auth, async (req, res) => {
  try {
    // console.log("ID: ", req.restaurant._id);

    const restaurant = await Restaurant.findById(req.restaurant._id);

    if (!restaurant) {
      return res
        .status(400)
        .json({ success: false, msg: "There is no entry for this restaurant" });
    }

    res.json({ success: true, restaurant });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// @route    GET restaurants/id
// @desc     Get selected restaurants
// @access   Public

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let restaurant = await Restaurant.findOne({ _id: id }).select(
      "-rest_id -rest_psswd"
    );
    if (!restaurant) {
      return res
        .status(400)
        .json({ success: false, msg: "There is no entry for this restaurant" });
    }

    res.json({ success: true, restaurant });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// @route    PUT /restaurant
// @desc     To update the restaurant
// @access   Private

router.put("/rest/:categ", rest_auth, async (req, res) => {
  // console.log(req.restaurant);

  const {
    rest_id,
    rest_psswd,
    rest_name,
    rest_email,
    rest_addr,
    rest_no,
    rest_type,
    rest_timing_start,
    rest_timing_end,
    rest_tags,
    dine_type,
    is_alcohol,
    owner_name,
    owner_email,
    owner_no,
    // date,
    menu,
    orientation
  } = req.body;

  const categ = req.params.categ.trim();
  const _id = req.restaurant._id;
  let restaurantFields = {};
  if (categ === "menu") {
    // restaurantFields.menu = {};
    if (menu) {
      restaurantFields.menu = { ...menu };
    }
  } else if (categ === "orientation") {
    // restaurantFields.orientation = {};
    if (orientation) {
      restaurantFields.orientation = { ...orientation };
    }
  } else if (categ === "main") {
    if (rest_id) restaurantFields.rest_id = rest_id;
    if (rest_psswd) restaurantFields.rest_psswd = rest_psswd;
    if (rest_name) restaurantFields.rest_name = rest_name;
    if (rest_email) restaurantFields.rest_email = rest_email;
    if (rest_addr) restaurantFields.rest_addr = rest_addr;
    if (rest_no) restaurantFields.rest_no = rest_no;
    if (rest_tags) restaurantFields.rest_tags = [...rest_tags];
    if (rest_type) restaurantFields.rest_type = rest_type;
    if (rest_timing_start)
      restaurantFields.rest_timing_start = rest_timing_start;
    if (rest_timing_end) restaurantFields.rest_timing_end = rest_timing_end;
    if (dine_type) restaurantFields.dine_type = dine_type;
    if (is_alcohol) restaurantFields.is_alcohol = is_alcohol;
    if (owner_name) restaurantFields.owner_name = owner_name;
    if (owner_email) restaurantFields.owner_email = owner_email;
    if (owner_no) restaurantFields.owner_no = owner_no;
    // if(date) restaurantFields.date = date;
  } else if (categ === "all") {
    if (rest_id) restaurantFields.rest_id = rest_id;
    if (rest_psswd) restaurantFields.rest_psswd = rest_psswd;
    if (rest_name) restaurantFields.rest_name = rest_name;
    if (rest_email) restaurantFields.rest_email = rest_email;
    if (rest_addr) restaurantFields.rest_addr = rest_addr;
    if (rest_no) restaurantFields.rest_no = rest_no;
    if (rest_tags) restaurantFields.rest_tags = [...rest_tags];
    if (rest_type) restaurantFields.rest_type = rest_type;
    if (rest_timing_start)
      restaurantFields.rest_timing_start = rest_timing_start;
    if (rest_timing_end) restaurantFields.rest_timing_end = rest_timing_end;
    if (dine_type) restaurantFields.dine_type = dine_type;
    if (is_alcohol) restaurantFields.is_alcohol = is_alcohol;
    if (owner_name) restaurantFields.owner_name = owner_name;
    if (owner_email) restaurantFields.owner_email = owner_email;
    if (owner_no) restaurantFields.owner_no = owner_no;
    if (menu) {
      restaurantFields.menu = { ...menu };
    }
    if (orientation) {
      restaurantFields.orientation = { ...orientation };
    }
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let restaurant = await Restaurant.findOneAndUpdate(
      { _id: _id },
      { $set: restaurantFields },
      { new: true, upsert: true }
    );
    // delete restaurant.rest_psswd;
    res.json({ success: true, restaurant: restaurant });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, msg: "Cannot Update, Server Error" });
  }
});

module.exports = router;
