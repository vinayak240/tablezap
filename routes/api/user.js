const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");

// @route    POST users/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
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

    const { name, phone, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        phone,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: user
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res.json({ success: true, token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
);

// @route    POST users/login
// @desc     Login user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
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

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Credentials" });
      }

      const payload = {
        user: user
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7d" },
        (err, token) => {
          // Here
          if (err) throw err;
          res.json({ success: true, token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
);

// @route    POST users/google-login
// @desc     Login user & get token
// @access   Public
router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  const client = new OAuth2Client(config.get("googleClientId"));

  try {
    const response = await client.verifyIdToken({
      idToken: token,
      audience: config.get("googleClientId")
    });
    const { email, name } = response.payload;

    User.findOne({ email }).exec(async (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "Cannot Authenticate" });
      } else {
        if (user) {
          const payload = {
            user: user
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: "7d" },
            (err, token) => {
              // Here
              if (err) throw err;
              res.json({ success: true, token: token });
            }
          );
        } else {
          let newUser = new User({
            name,
            email
          });

          const salt = await bcrypt.genSalt(10);
          let password = email + config.get("jwtSecret");
          newUser.password = await bcrypt.hash(password, salt);

          await newUser.save();

          const payload = {
            user: newUser
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: "7d" },
            (err, token) => {
              if (err) throw err;
              res.json({ success: true, token: token });
            }
          );
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, msg: "Cannot Authenticate" });
  }
});

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
