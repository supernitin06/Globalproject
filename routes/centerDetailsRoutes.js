const express = require("express");
const {
  addCenter,
  getCenter,
  getAllCenters,
  updateCenter,
  deleteCenter,
  getByCenterUser
} = require("../controllers/centerDetailsController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addCenter); 
router.get("/by",protect, getByCenterUser);
router.get("/all-check", getAllCenters); 
router.get("/:id", getCenter);
router.put("/:id", updateCenter);
router.delete("/:id", deleteCenter);
module.exports = router;
