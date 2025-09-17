const express = require("express");
const router = express.Router();
const { getItems, addItem } = require("../controllers/itemsController");

router.get("/", getItems);
router.post("/", addItem);

module.exports = router;
