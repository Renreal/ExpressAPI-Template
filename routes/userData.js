const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
} = require("../controllers/userDataController");

router.get("/", getUserData);
router.post("/", addUserData);
router.put("/:id", updateUserData);
router.delete("/:id", deleteUserData);

module.exports = router;
//   Routes for handling userData-related requests
