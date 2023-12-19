const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");

const router = express.Router();

// check apikey

router.use(apiKey);

// check permission

router.use(permission("0000"));

router.use("/v1/api/shop", require("./access"));
router.use("/v1/api/book", require("./book"));
router.use("/v1/api/borrowBook", require("./borrowBooks"));
router.use("/v1/api/typeBook", require("./typeBook"));

module.exports = router;
