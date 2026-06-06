const express = require("express");
const {
  addResource,
  getResources,
  addReview,
} = require("../controllers/resourceController");

const router = express.Router();

router.post("/add", addResource);
router.get("/", getResources);
router.post("/:id/reviews", addReview);

module.exports = router;