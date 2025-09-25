const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getItems, addItem } = require("../controllers/itemsController");

router.get("/", getItems);
router.post("/", upload.single("image"), addItem);

module.exports = router;
//   Routes for handling item-related requests