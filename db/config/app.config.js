const settings = require("./settings");

module.exports = {
  app: settings["app"],
  db: settings["db"],
  secrets: settings["secrets"],
  currentEnviroment: process.env.NODE_ENV,
};
