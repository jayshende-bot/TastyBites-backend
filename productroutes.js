const express = require("express");
const router = express.Router();

const ProductController = require("./productController");
const authMiddleware = require("./authentication");

/* ================= ASYNC ERROR WRAPPER ================= */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/* ================= AUTH (PUBLIC) ================= */
router.post("/register", asyncHandler(ProductController.register));
router.post("/login", asyncHandler(ProductController.login));

/* ================= PRODUCTS (PUBLIC) ================= */
router.get("/products/:type", asyncHandler(ProductController.getAll));

/* ================= PROTECTED ROUTES ================= */
router.use(authMiddleware);

/* ================= ORDERS ================= */
router.post("/orders", asyncHandler(ProductController.createOrder));
router.get("/orders", asyncHandler(ProductController.getAllOrders));
router.get("/orders/user/:email", asyncHandler(ProductController.getUserOrders));
router.delete("/orders", asyncHandler(ProductController.deleteAllOrders));

/* ================= ADMIN PRODUCTS ================= */
router.post("/products/:type", asyncHandler(ProductController.saveOne));
router.post("/products/:type/bulk", asyncHandler(ProductController.saveAll));
router.delete("/products/:type/:id", asyncHandler(ProductController.deleteOne));
router.delete("/products/:type", asyncHandler(ProductController.deleteAll));

module.exports = router;
