const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Return cached connection if available
  if (cached.conn) {
    console.log("[DB] Using cached MongoDB connection");
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    const error = "MONGODB_URI environment variable is not set";
    console.error("[DB] ERROR:", error);
    throw new Error(error);
  }

  console.log("[DB] Attempting to connect to MongoDB...");

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("[DB] ✅ MongoDB connected successfully");
    return cached.conn;
  } catch (err) {
    console.error("[DB] ❌ Connection failed:", err.message);
    cached.promise = null; // Reset promise on failure
    throw err;
  }
};

module.exports = connectDB;
