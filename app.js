const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const appConfig = require("./config/app.config");
const cors = require("cors");
const Logger = require("./utils/logger");
const cookieParser = require("cookie-parser");
const { REST_DASH_URL } = require("./constants/api_constants");

const app = express();

// CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: [REST_DASH_URL],
  })
);

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

if (appConfig.currentEnviroment === "development") {
  app.use((req, res, next) => {
    Logger.debug(`[API] Received a ${req.method}: ${req.url}`);
    return next();
  });
}

// Define API
app.use("/api/v1", require("./routes/v1"));

module.exports = app;
