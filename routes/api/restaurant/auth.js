/*jshint esversion: 9 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const rest_auth = require("../../../middleware/rest_auth");
const refresh_auth = require("../../../middleware/refresh_auth");
const { check, validationResult } = require("express-validator/check");

const Restaurant = require("../../../models/Restaurant");

// @route    POST restaurants/register
// @desc     Register restaurant
// @access   Public

router.post(
  "/register",
  [
    check("rest_name", "Name is required").not().isEmpty(),
    check("rest_id", "Restaurant ID is required").not().isEmpty(),
    check("rest_email", "Please include a valid email").isEmail(),
    check(
      "rest_psswd",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    const { rest_id, rest_name, rest_psswd } = req.body;

    try {
      let restaurant = await Restaurant.findOne({ rest_id });

      if (restaurant) {
        return res.status(400).json({
          success: false,
          msg: "Restaurant with this ID already exists",
        });
      }

      restaurant = await Restaurant.findOne({ rest_name });

      if (restaurant) {
        return res.status(400).json({
          success: false,
          msg: "Restaurant with this name already exists",
        });
      }

      restaurant = new Restaurant({
        ...req.body,
      });

      const salt = await bcrypt.genSalt(10);

      restaurant.rest_psswd = await bcrypt.hash(rest_psswd, salt);

      await restaurant.save();

      const payload = {
        restaurant,
      };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   { expiresIn: 360000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ success: true, token, rest_name });
      //   }
      // );

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1y" },
        (err, refresh_token) => {
          // Here
          if (err) throw err;
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: "5m" },
            (err, access_token) => {
              if (err) throw err;
              //.cookie should come before .json
              res
                .cookie("_refresh_token_", refresh_token, {
                  maxAge: 31536000000,
                  httpOnly: true,
                  //secure: true -- For Prod
                })
                .json({
                  success: true,
                  token: access_token,
                  rest_name: restaurant.rest_name,
                });
            }
          );
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
    check("rest_id", "Please include a valid Restaurant ID").not().isEmpty(),
    check("rest_psswd", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
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
          _id: restaurant._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1y" },
        (err, refresh_token) => {
          // Here
          if (err) throw err;
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: "5m" },
            (err, access_token) => {
              if (err) throw err;
              res
                .cookie("_refresh_token_", refresh_token, {
                  maxAge: 31536000000,
                  httpOnly: true,
                  //secure: true -- For Prod
                })
                .json({
                  success: true,
                  token: access_token,
                  rest_name: restaurant.rest_name,
                });
            }
          );
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
);

// @route    GET /restaurants/refresh-token
// @desc     To Refresh the access token
// @access   Private
router.get("/refresh-token", refresh_auth, async (req, res) => {
  const payload = {
    restaurant: {
      _id: req.restaurant._id,
    },
  };

  try {
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5m" },
      (err, access_token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token: access_token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

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

// @route    GET restaurants/logout
// @desc     Logout Restaurant
// @access   Public
// TO-DO :
// Add refresh_auth middileware after logout feature is completed in UI
// Make it POST after that feature is added
router.post("/logout", refresh_auth, async (req, res) => {
  try {
    res
      .clearCookie("_refresh_token_")
      .status(200)
      .json({ success: true, msg: "Restaurant Logged Out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
