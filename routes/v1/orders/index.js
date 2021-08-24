const router = require("express").Router({ mergeParams: true });
const order_responses = require("./response");

router.use("/responses", order_responses);

module.exports = router;
