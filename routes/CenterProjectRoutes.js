const express = require("express");
const router = express.Router();
const { 
  addProject, 
  getAllProjects, 
  getProject, 
  updateProject, 
  deleteProject, 
  getAllByUser
} = require("../controllers/CenterProjectController");

const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 },
  ]),
protect,
  addProject
);

// ✅ Read All
router.get("/", getAllProjects);
router.get("/new", protect,getAllByUser);
// ✅ Read One
router.get("/:id", getProject);

// ✅ Update
router.put(
  "/:id",   upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 },
  ]), 
  updateProject
);

// ✅ Delete
router.delete("/:id", deleteProject);

module.exports = router;

