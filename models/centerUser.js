const mongoose = require("mongoose");

const centerUserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },


    //  name
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    //  email with unique + format validation
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    password: { type: String, required: true },

    //  phone with validation
    phone: { 
      type: String, 
      required: true, 
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"] 
    },

    //  active/inactive as string enum
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      default: "active" 
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.CenterUser || mongoose.model("CenterUser", centerUserSchema);
