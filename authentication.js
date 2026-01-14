const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  /* ================= PUBLIC ROUTES ================= */
  // Check both full path and relative path patterns
  const publicPatterns = [
    "/products",      // /api/v1/products/:type
    "/register",      // /api/v1/register
    "/login",         // /api/v1/login
  ];

  // ✅ Allow public routes by prefix match
  const isPublic = publicPatterns.some((pattern) => {
    return req.path.startsWith(pattern) || req.originalUrl.includes(pattern);
  });

  if (isPublic) {
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
