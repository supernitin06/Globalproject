const ProjectDetail = require("../models/projectDetails");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectDetail.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.createProject = async (req, res) => {
if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  console.log("✅ REQ BODY:", req.body);
  console.log("✅ FILE:", req.file);

  try {
    const projectData = req.body;

    if (req.file && req.file.path) {
      projectData.pdfLink = req.file.path; // ✅ Cloudinary PDF URL
    }

    const newProject = new ProjectDetail(projectData);
    console.log("📦 Ready to Save:", newProject); // 👈 ADD THIS

    await newProject.save();
    console.log("✅ Project saved to DB");

    res.status(201).json(newProject);
  } catch (err) {
    console.error("❌ Error while saving:", err);
    res.status(400).json({ message: err.message });
  }
};

// exports.updateProject = async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
//   try {
//     const updated = await ProjectDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };



exports.updateProject = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  try {
    const projectId = req.params.id;
    const updatedData = req.body;

    // ✅ If new PDF uploaded, update pdfLink
    if (req.file && req.file.path) {
      updatedData.pdfLink = req.file.path;
    }

    const updated = await ProjectDetail.findByIdAndUpdate(projectId, updatedData, { new: true });

    res.json(updated);
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(400).json({ message: err.message });
  }
};


exports.deleteProject = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
  try {
    await ProjectDetail.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// controllers/projectDetails.js
exports.searchProjects = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Project code query is required" });
  }

  try {
    const results = await ProjectDetail.find({
      projectCode: { $regex: query, $options: "i" },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
