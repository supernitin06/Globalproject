const Center = require("../models/CenterDetails");
const mongoose = require("mongoose")
// ✅ Create a new center
exports.addCenter = async (req, res) => {
try {
    const { projectCode, projectType, projectApprovalDate } = req.body;
    const userId = req.user.userId; // Get userId from the authenticated user
    console.log("Creating center with userId:", userId); // Log the userId being used

    const newProject = new Center({
      userId,  
      projectCode,
      projectType,
      projectApprovalDate
    });
    
    console.log("Center object to be saved:", newProject); // Log the center object

    await newProject.save();
    console.log("Center saved successfully:", newProject._id); // Log successful save

    res.status(201).json({ status: true, message: "Center details created", data: newProject });
  } catch (err) {
    console.error("Error creating center:", err); // Log any errors
    res.status(500).json({ status: false, message: err.message });
  }
};

// ✅ Get center by ID
exports.getCenter = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get all centers by userId
exports.getByCenterUser = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ ab token se aa raha hai
    console.log("Extracted userId from token:", userId); // Log the extracted userId

    if (!userId) {
      return res.status(400).json({
        message: "userId is missing in token",
        status: false,
      });
    }

    const centers = await Center.find({ userId }).sort({ createdAt: -1 });
    console.log("Centers found for userId:", centers); // Log the centers found

    res.status(200).json({
      message: "All center details by userId",
      status: true,
      data: centers,
    });
  } catch (err) {
    console.error("Error in getByCenterUser:", err); // Log any errors
    res.status(500).json({ message: err.message, status: false });
  }
};





// ✅ Get all centers
exports.getAllCenters = async (req, res) => {
  try {
    const centers = await Center.find().sort({ createdAt: -1 });
    res.json(centers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};




// ✅ Update center by ID
exports.updateCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!center) return res.status(404).json({ msg: "Center not found" });
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Delete center by ID
exports.deleteCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndDelete(req.params.id);
    if (!center) return res.status(404).json({ msg: "Center not found" });
    res.json({ msg: "Center deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};