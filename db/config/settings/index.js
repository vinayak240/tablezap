module.exports = {
  production: require("./settings_prd.json"),
  development: require("./settings_dev.json"),
}[process.env.NODE_ENV || process.env.env];
