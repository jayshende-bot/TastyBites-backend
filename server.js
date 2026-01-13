// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const productRoutes = require("./productroutes");

// const app = express();

// // ================================
// // MIDDLEWARE
// // ================================
// app.use(cors());
// app.use(express.json());

// // ================================
// // STATIC FILES
// // ================================
// app.use("/images", express.static(path.join(__dirname, "images")));

// // ================================
// // DATABASE CONNECTION (🔥 FIRST)
// // ================================
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     // ================================
//     // ROUTES (🔥 ONLY AFTER DB CONNECTS)
//     // ================================
//     app.use("/api/v1/products", productRoutes);

//     // ================================
//     // START SERVER
//     // ================================
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Failed:", err);
//   });
// require("dotenv").config();
// 


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const productRoutes = require("./productroutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*", // Allow all origins; change to your frontend URL in production if needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Enable preflight for all routes
app.options("*", cors());

// Parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
// Safe DB connection: prevents crash if DB fails
(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Do not crash server; routes can still respond with errors
  }
})();

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TastyBites API running 🚀",
  });
});

app.use("/api/v1", productRoutes);

/* ================= ERROR HANDLER ================= */
// Catch-all middleware to prevent unhandled errors from crashing server
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error (caught by fallback)",
  });
});

/* ================= LOCAL DEV ONLY ================= */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

/* ================= VERCEL EXPORT ================= */
module.exports = app;
