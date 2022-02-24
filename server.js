const http = require("http");
const sio = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const appConfig = require("./config/app.config");
const Logger = require("./utils/logger");
const initMQConsumers = require("./messaging/consumers");
const InitSktListeners = require("./sockets/listeners/");
const InitSktEmitters = require("./sockets/emitters");
const server = http.createServer(require("./app"));

process.on("uncaughtException", (e) => {
  Logger.error(`Uncaught Error ${e}`);
});

Logger.info("[SERVICE] *** Initializing Restaurant Service *** ");

const io = sio(server);

require("./db");

initMQConsumers();

InitSktListeners.init(io);

InitSktEmitters.init(io);

const PORT = process.env.PORT || 5000;

process.on("exit", () => {
  Logger.info(`[SERVICE] [PID: ${process.pid}] STOPPING Restaurant Service...`);
});

server.listen(PORT, () => {
  Logger.info(
    `[SERVICE] [PID: ${process.pid}] STARTED Restaurant Service at PORT : ${PORT} in MODE: ${appConfig.currentEnviroment}`
  );
});
