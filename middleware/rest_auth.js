const jwt = require("jsonwebtoken");
const config = require("../config/app.config");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, config.secrets["jwtSecret"], (error, decoded) => {
      if (error) {
        res.status(401).json({ success: false, msg: "Token is not valid" });
      } else {
        req.restaurant = decoded.restaurant;
        next();
      }
    });
  } catch (err) {
    logger.error("[IMPL] Error while verifying the restaurant token");
    logger.error("", err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
