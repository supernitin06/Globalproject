const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

New Message
02:45 PM
PORT= 5001
MONGO_URI=mongodb+srv://divyasingh:divyasingh0612@cluster0.hjvd31d.mongodb.net/formSubmit?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=blobalProjectbimaxtechnolog
EMAIL_USER=no-reply@projectsglobal.in
EMAIL_PASS= Noreply@123580
SMTP_HOST=mail.projectsglobal.in
SMTP_PORT=587
CLOUDINARY_CLOUD_NAME=dlhp3v3fd
CLOUDINARY_API_KEY=897159174793714
CLOUDINARY_API_SECRET=QPkyvV6Q7Q00lhbfk7LcuVBi8EE