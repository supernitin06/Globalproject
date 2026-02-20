const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Define same User schema used in your app
const userSchema = new mongoose.Schema({
  // email: { type: String, unique: true },
  username: { type: String, unique: true, required: true }, // ✅ Changed to username
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: String,
  resetTokenExpire: Date,
});

const User = mongoose.model("User", userSchema);

// Sample Users
const users = [
  { username: "Abhishek@123", password: "Abhishek@Bitmax2020", role: "admin" },
  { username: "aneetagp", password: "Aneeta@123", role: "user" },
  { username: "aarjugp", password: "Aarju@123", role: "user" },
  { username: "sakshigp", password: "Sakshi@123", role: "user" },
  { username: "khushboogp", password: "Khushboo@123", role: "user" },
  { username: "vanshgp", password: "Vansh@123", role: "user" },
  { username: "divyagp", password: "Divya@123", role: "user" },
];

// Insert Users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Optional: clear previous users

    // for (const u of users) {
    //   const hashedPassword = await bcrypt.hash(u.password, 10);
    //   await User.create({ email: u.email, password: hashedPassword, role: u.role });
    // }

     for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({
        username: u.username,
        password: hashedPassword,
        role: u.role,
      });
    }
    console.log("🎉 Users seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
  }
};

seedUsers();
