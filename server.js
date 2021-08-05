const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const appConfig = require("./config/app.config");
const cors = require("cors");
const Logger = require("./utils/logger");
const initMQConsumers = require("./messaging/receivers");
const cookieParser = require("cookie-parser");

const app = express();

process.on("uncaughtException", (e) => {
  Logger.error(`Uncaught Error ${e}`);
});

Logger.info("[SERVICE] *** Initializing Restaurant Service *** ");

require("./db");

initMQConsumers().catch((err) => Logger.error(err));

// CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
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

// Define Routes
app.use("/users", require("./routes/api/user"));
app.use("/restaurants", require("./routes/api/restaurant"));

const PORT = process.env.PORT || 5000;

process.on("exit", () => {
  Logger.info("[SERVICE] STOPPING Order Service...");
});

app.listen(PORT, () => {
  Logger.info(
    `[SERVICE] STARTED Order Service at PORT : ${PORT} in MODE: ${appConfig.currentEnviroment}`
  );
});
