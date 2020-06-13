/*jshint esversion: 9 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const rest_auth = require("../../middleware/rest_auth");
const { check, validationResult } = require("express-validator/check");

const Restaurant = require("../../models/Restaurant");

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

// @route    POST restaurants/login
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
        restaurant
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

// @route    GET api/rest_auth
// @desc     Test route
// @access   Private
router.get("/rest", rest_auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id).select(
      "-rest_psswd"
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

module.exports = router;
