const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: /^[0-9]{10}$/
    },

    address: {
      house: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    lastLogin: { type: Date }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
