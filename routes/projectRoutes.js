// routes/projectRoutes.js ✅ CORRECTED
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../utils/cloudinaryStorage"); // 👈 import multer-cloudinary

// router.post("/", projectController.createProject);        // POST /api/projects
// For uploading both PDF and Image
router.post("/", upload.fields([
  { name: "imageFile", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 }
]), projectController.createProject);


router.get("/", projectController.getAllProjects);        // GET /api/projects
router.get("/live", projectController.getLiveProjects);    //  GET /api/projects/live
router.get("/live-count",  projectController.getLiveProjects); //  For Available Projects count
router.get("/:id", projectController.getProjectById);     // GET /api/projects/:id
// router.put("/:id", projectController.updateProject);      // PUT /api/projects/:id
router.put(
  "/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  projectController.updateProject
);

router.delete("/:id", projectController.deleteProject);   // DELETE /api/projects/:id    m, nm,
// PATCH: Increment or Decrement totalApplications
router.patch("/:id/update-applications", projectController.updateApplicationCount);

module.exports = router;

