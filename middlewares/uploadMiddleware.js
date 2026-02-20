const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects",
    resource_type: "auto", 
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});
const upload = multer({ storage });

module.exports = upload;

