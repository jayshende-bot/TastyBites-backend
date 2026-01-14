const express = require("express");
const router = express.Router();

const ProductController = require("./productController");
const authMiddleware = require("./authentication");

/* ================= AUTH (PUBLIC) ================= */
router.post("/register", ProductController.register);
router.post("/login", ProductController.login);

/* ================= PRODUCTS (PUBLIC) ================= */
router.get("/products/:type", ProductController.getAll);

/* ================= PROTECTED ROUTES ================= */
router.use(authMiddleware);

/* ================= ORDERS ================= */
router.post("/orders", ProductController.createOrder);
router.get("/orders", ProductController.getAllOrders);
router.get("/orders/user/:email", ProductController.getUserOrders);
router.delete("/orders", ProductController.deleteAllOrders);

/* ================= ADMIN PRODUCTS ================= */
router.post("/products/:type", ProductController.saveOne);
router.post("/products/:type/bulk", ProductController.saveAll);
router.delete("/products/:type/:id", ProductController.deleteOne);
router.delete("/products/:type", ProductController.deleteAll);

module.exports = router;
