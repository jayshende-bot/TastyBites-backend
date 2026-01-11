// const express = require("express");
// const router = express.Router();
// const ProductController = require("./productController");
// const authMiddleware = require("./authentication");

// // ================================
// // CORS (Handled via middleware in server.js)
// // ================================
// // No need to manually do router.options("*", ...)
// // Make sure server.js has: app.use(cors());

// // ================================
// // AUTH ROUTES (PUBLIC)
// // ================================
// router.post("/register", ProductController.register);
// router.post("/login", ProductController.login);

// // ================================
// // PRODUCT ROUTES (PUBLIC)
// // ================================
// router.get("/veg", (req, res) => ProductController.getAll("veg", req, res));
// router.get("/nonveg", (req, res) => ProductController.getAll("nonveg", req, res));
// router.get("/drink", (req, res) => ProductController.getAll("drink", req, res));

// // ================================
// // APPLY AUTH MIDDLEWARE
// // ================================
// router.use(authMiddleware);

// // ================================
// // ORDER ROUTES (PROTECTED)
// // ================================
// router.post("/orders", ProductController.createOrder);
// router.get("/orders/user/:email", ProductController.getUserOrders);
// router.get("/orders", ProductController.getAllOrders);
// router.delete("/orders", ProductController.deleteAllOrders);

// // ================================
// // PRODUCT ROUTES (ADMIN)
// // ================================
// router.post("/:type", ProductController.saveOne);
// router.post("/:type/bulk", ProductController.saveAll);
// router.delete("/:type/:id", ProductController.deleteOne);
// router.delete("/:type", 
// const express = require("express");


const express = require("express");
const router = express.Router();

/* ✅ IMPORT NAME MATCHES USAGE */
const ProductController = require("./productController");
const authMiddleware = require("./authentication");

/* ========== AUTH (PUBLIC) ========== */
router.post("/register", ProductController.register);
router.post("/login", ProductController.login);

/* ========== PRODUCTS (PUBLIC) ========== */
router.get("/products/:type", ProductController.getAll);

/* ========== PROTECTED ROUTES ========== */
router.use(authMiddleware);

/* ========== ORDERS ========== */
router.post("/orders", ProductController.createOrder);
router.get("/orders", ProductController.getAllOrders);
router.get("/orders/user/:email", ProductController.getUserOrders);
router.delete("/orders", ProductController.deleteAllOrders);

/* ========== ADMIN PRODUCTS ========== */
router.post("/products/:type", ProductController.saveOne);
router.post("/products/:type/bulk", ProductController.saveAll);
router.delete("/products/:type/:id", ProductController.deleteOne);
router.delete("/products/:type", ProductController.deleteAll);

module.exports = router;
