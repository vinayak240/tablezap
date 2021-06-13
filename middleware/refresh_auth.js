const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  // Get token from cookies
  const token = req.cookies["_refresh_token_"];

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No refresh token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        res
          .status(401)
          .json({ success: false, msg: "Refresh token is not valid" });
      } else {
        req.restaurant = decoded.restaurant;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
