/*jshint esversion: 9 */
const express = require("express");
const router = express.Router();
const rest_auth = require("../../../middleware/rest_auth");
const Logger = require("../../../utils/logger");
const Restaurant = require("../../../db/models/Restaurant");

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

    Logger.info(`[IMPL] Fetched all restaurants`);

    res.json({ success: true, restaurants });
  } catch (err) {
    Logger.error(`[IMPL] Error occured while fetching all restaurants`);
    Logger.error("", err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// @route    GET /restaurants/rest
// @desc     To get the restaurant
// @access   Private

router.get("/rest", rest_auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id);

    if (!restaurant) {
      return res
        .status(400)
        .json({ success: false, msg: "There is no entry for this restaurant" });
    }

    Logger.info(`Restaurant Fetched, _id: ${req.restaurant?._id}`);

    res.json({ success: true, restaurant });
  } catch (err) {
    Logger.error(
      `[IMPL] Error while fetching restaurant. _id: ${req.restaurant._id}`
    );
    Logger.error("", err);
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
        .status(404)
        .json({ success: false, msg: "There is no entry for this restaurant" });
    }

    Logger.info(`Restaurant Fetched, id: ${req.params?._id}`);

    res.json({ success: true, restaurant });
  } catch (err) {
    Logger.error(
      `[IMPL] Error while fetching restaurant. id: ${req.params?.id}`
    );
    Logger.error("", err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// @route    PUT /restaurant
// @desc     To update the restaurant
// @access   Private

router.put("/rest/:categ", rest_auth, async (req, res) => {
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
    orientation,
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

    Logger.info(`Restaurant updated, _id: ${req.restaurant?._id}`);

    res.json({ success: true, restaurant: restaurant });
  } catch (err) {
    Logger.error(
      `[IMPL] Error while updating the restaurant, _id: ${req.restaurant?._id}`
    );
    Logger.error("", err);
    res
      .status(500)
      .json({ success: false, msg: "Cannot Update, Server Error" });
  }
});

module.exports = router;
