// const mongoose = require("mongoose");

// // ==========================
// // VEG PRODUCTS
// // ==========================
// const vegSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String, // renamed 'des' → 'description' for consistency
//   price: { type: Number, required: true },
//   image: String
// }, { timestamps: true });

// const Veg = mongoose.model("Veg", vegSchema, "vegproducts");

// // ==========================
// // NONVEG PRODUCTS
// // ==========================
// const nonvegSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String, // renamed 'des' → 'description'
//   price: { type: Number, required: true },
//   image: String
// }, { timestamps: true });

// const Nonveg = mongoose.model("Nonveg", nonvegSchema, "nonvegproducts");

// // ==========================
// // DRINK PRODUCTS
// // ==========================
// const drinkSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   price: { type: Number, required: true },
//   image: String
// }, { timestamps: true });

// const Drink = mongoose.model("Drink", drinkSchema, "drinkproducts");

// // ==========================
// // ORDER SCHEMA
// // ==========================
// const orderSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   items: [
//     {
//       id: { type: String, required: true },
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, default: 1 },
//       image: String
//     }
//   ],
//   subtotal: { type: Number, required: true },
//   totalDiscount: { type: Number, default: 0 },
//   gst: { type: Number, default: 0 },
//   finalTotal: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// }, { timestamps: true });

// const Order = mongoose.model("Order", orderSchema, "orders");

// // ==========================
// // EXPORT MODELS
// // ==========================
// module.exports = {
//   Veg,
//   Nonveg,
//   Drink,
//   Order
// };



const mongoose = require("mongoose");

/* ==========================
   VEG PRODUCTS
========================== */
const vegSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

vegSchema.index({ createdAt: -1 });

const Veg =
  mongoose.models.Veg ||
  mongoose.model("Veg", vegSchema, "vegproducts");

/* ==========================
   NON-VEG PRODUCTS
========================== */
const nonvegSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

nonvegSchema.index({ createdAt: -1 });

const Nonveg =
  mongoose.models.Nonveg ||
  mongoose.model("Nonveg", nonvegSchema, "nonvegproducts");

/* ==========================
   DRINK PRODUCTS
========================== */
const drinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

drinkSchema.index({ createdAt: -1 });

const Drink =
  mongoose.models.Drink ||
  mongoose.model("Drink", drinkSchema, "drinkproducts");

/* ==========================
   ORDER SCHEMA
========================== */
const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    items: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, default: 1, min: 1 },
        image: { type: String, default: "" },
      },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    totalDiscount: { type: Number, default: 0, min: 0 },
    gst: { type: Number, default: 0, min: 0 },
    finalTotal: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

orderSchema.index({ email: 1, createdAt: -1 });

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema, "orders");

/* ==========================
   EXPORT MODELS
========================== */
module.exports = {
  Veg,
  Nonveg,
  Drink,
  Order,
};
