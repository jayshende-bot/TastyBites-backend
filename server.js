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
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ handle preflight explicitly
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
/**
 * IMPORTANT:
 * On Vercel, the function may run multiple times.
 * Your connectDB() must internally handle
 * "already connected" state (mongoose cached connection).
 */
connectDB();

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TastyBites API running 🚀",
  });
});

/**
 * API prefix
 * Example:
 * /api/v1/veg
 * /api/v1/nonveg
 */
app.use("/api/v1", productRoutes);

/* ================= LOCAL DEV ONLY ================= */
/**
 * Vercel DOES NOT allow app.listen()
 * So we start server ONLY when running locally
 */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

/* ================= VERCEL EXPORT ================= */
module.exports = app;
