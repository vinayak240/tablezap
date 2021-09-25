const router = require("express").Router({ mergeParams: true });
const table_req_responses = require("./response");

router.use("/responses", table_req_responses);

module.exports = router;
