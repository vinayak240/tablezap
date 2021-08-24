const router = require("express").Router({ mergeParams: true });

router.use("/users", require("./user"));
router.use("/restaurants", require("./restaurant"));
router.use("/orders", require("./orders"));

module.exports = router;
