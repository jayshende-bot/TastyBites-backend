const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  });

  isConnected = true;
  console.log("✅ MongoDB connected");
};

module.exports = connectDB;
