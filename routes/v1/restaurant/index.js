/*jshint esversion: 9 */
const router = require("./restaurant");

router.use("/auth", require("./auth"));

module.exports = router;
