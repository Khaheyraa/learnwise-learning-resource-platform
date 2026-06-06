const express = require("express");
const {
  registerUser,
  loginUser,
  toggleBookmark,
  getBookmarks,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/bookmark", toggleBookmark);
router.get("/:userId/bookmarks", getBookmarks);

module.exports = router;