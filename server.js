
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const productRoutes = require("./productroutes");

const app = express();

/* ================= CORS ================= */
const allowedOrigins = [
  "https://frontend-two-dusky-53.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server-side requests
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      // Reject unknown origins without throwing
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

/* ================= BODY PARSERS ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= FAVICON ================= */
app.get("/favicon.ico", (req, res) => res.status(204).end());

/* ================= DATABASE ================= */
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
})();

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TastyBites API running 🚀",
  });
});

/* ================= API ROUTES ================= */
app.use("/api/v1", productRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

/* ================= LOCAL DEV ================= */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

/* ================= VERCEL EXPORT ================= */
module.exports = app;
