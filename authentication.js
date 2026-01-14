// // authentication.js
// const jwt = require("jsonwebtoken");

// // Middleware to protect routes
// const authMiddleware = (req, res, next) => {

//   // ================================
//   // 🔓 ALLOW PUBLIC PRODUCT ROUTES
//   // ================================
//   const publicRoutes = ["/veg", "/nonveg", "/drink"];

//   if (publicRoutes.some(route => req.originalUrl.includes(route))) {
//     return next(); // skip auth
//   }

//   try {
//     // 1. Check if token exists in authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         status: false,
//         message: "Authorization token missing",
//       });
//     }

//     // 2. Extract token (Bearer <token>)
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({
//         status: false,
//         message: "Token missing",
//       });
//     }

//     // 3. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 4. Store decoded data in request object
//     req.user = decoded;

//     // 5. Allow request to continue
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// module.exports = authMiddleware;





const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  /* ================= PUBLIC ROUTES ================= */
  const publicPrefixes = [
    "/api/v1/products", // allows /products/veg, nonveg, drink
    "/api/v1/register",
    "/api/v1/login",
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
