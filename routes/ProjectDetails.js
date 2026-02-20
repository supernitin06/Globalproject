
const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectDetails");
const { protect } = require("../middlewares/authMiddleware");

// ✅ File upload setup
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "global-projects/pdfs",
    resource_type: "raw",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    allowed_formats: ["pdf"],
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get("/", protect, controller.getAllProjects);

// Only admin can upload + create
router.post("/", protect, upload.single("pdfFile"), controller.createProject);

// Update/Delete (admin-only, role check is inside controller)
// router.put("/:id", protect, controller.updateProject);
router.put("/:id", protect, upload.single("pdfFile"), controller.updateProject);

router.delete("/:id", protect, controller.deleteProject);
router.get("/search", protect, controller.searchProjects);

module.exports = router;
