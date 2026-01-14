const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  /* ================= PUBLIC ROUTES ================= */
  const publicPrefixes = [
    "/products", // allows /products/:type
    "/register",
    "/login",
  ];

  // ✅ Allow public routes by prefix match
  if (publicPrefixes.some((path) => req.path.startsWith(path))) {
    return next();
  }

  /* ================= AUTH CHECK ================= */
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
