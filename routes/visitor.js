const express = require("express");
const router = express.Router();
const { getVisitors } = require("../controllers/visitorsController");

router.get("/", getVisitors);

module.exports = router;
