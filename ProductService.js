

// const mongoose = require("mongoose");
// const { Veg, Nonveg, Drink, Order } = require("./schema");
// const User = require("./userSchema");

// // Map type string → Mongoose models (collections)
// const collectionMap = {
//   veg: Veg,           // vegproducts
//   nonveg: Nonveg,     // nonvegproducts
//   drink: Drink,       // drinkproducts
//   order: Order        // orders
// };

// class ProductService {
//   // ==========================
//   // GET MODEL (safe)
//   // ==========================
//   static getModel(type) {
//     if (!type) throw new Error("Type is required");
//     const key = type.trim().toLowerCase();
//     const model = collectionMap[key];
//     if (!model) throw new Error(`Invalid type: ${type}`);
//     return model;
//   }

//   // ==========================
//   // PRODUCT CRUD
//   // ==========================
//   static async saveOne(type, data) {
//     // ❌ Prevent creating orders through saveOne
//     if (type === "order") {
//       throw new Error("Orders must be created using createOrder() to calculate finalTotal.");
//     }

//     const model = this.getModel(type);
//     return await model.create(data);
//   }

//   static async saveAll(type, dataArray) {
//     const model = this.getModel(type);
//     if (!Array.isArray(dataArray)) throw new Error("Data must be an array");
//     return await model.insertMany(dataArray);
//   }

//   static async getAll(type) {
//     const model = this.getModel(type);
//     return await model.find().lean();
//   }

//   static async deleteOne(type, id) {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       throw new Error("Invalid ID");
//     const model = this.getModel(type);
//     const deleted = await model.findByIdAndDelete(id);
//     if (!deleted) throw new Error(`${type} not found`);
//     return deleted;
//   }

//   static async deleteAll(type) {
//     const model = this.getModel(type);
//     return await model.deleteMany({});
//   }

//   // ==========================
//   // ORDER SERVICES (FIXED)
//   // ==========================
//   static async createOrder(data) {
//     const { email, items } = data;

//     if (!email || !items || items.length === 0) {
//       throw new Error("Email and items are required");
//     }

//     // ✅ Calculate subtotal
//     const subtotal = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const totalDiscount = 0;
//     const gst = +(subtotal * 0.05).toFixed(2); // 5% GST rounded to 2 decimals
//     const finalTotal = +(subtotal + gst - totalDiscount).toFixed(2); // 🔴 REQUIRED FIELD

//     console.log("Final Total:", finalTotal); // debug log

//     // ✅ Create order with finalTotal included
//     return await Order.create({
//       email,
//       items,
//       subtotal,
//       totalDiscount,
//       gst,
//       finalTotal
//     });
//   }

//   static async getAllOrders() {
//     return await Order.find().sort({ date: -1 }).lean();
//   }

//   static async deleteAllOrders() {
//     return await Order.deleteMany({});
//   }

//   static async getUserOrders(email) {
//     if (!email) throw new Error("Email is required");
//     return await Order.find({ email }).sort({ date: -1 }).lean();
//   }
// }

// module.exports = ProductService;



// const mongoose = require("mongoose");
// const connectDB = require("./db");
// const { Veg, Nonveg, Drink, Order } = require("./schema");

// /* ================= MAP TYPE → MODEL ================= */
// const collectionMap = {
//   veg: Veg,
//   nonveg: Nonveg,
//   drink: Drink
// };

// class ProductService {

//   /* ================= SAFE MODEL RESOLVER ================= */
//   static getModel(type) {
//     if (!type || typeof type !== "string") {
//       throw new Error("Product type is required");
//     }

//     const key = type.trim().toLowerCase(); // ✅ IMPORTANT FIX

//     if (!collectionMap[key]) {
//       throw new Error(`Invalid product type: ${key}`);
//     }

//     return collectionMap[key];
//   }

//   /* ================= PRODUCTS ================= */

//   static async getAll(type) {
//     await connectDB();
//     const Model = this.getModel(type);
//     return Model.find().sort({ createdAt: -1 }).lean();
//   }

//   static async saveOne(type, data) {
//     await connectDB();
//     const Model = this.getModel(type);
//     return Model.create(data);
//   }

//   static async saveAll(type, dataArray) {
//     await connectDB();

//     if (!Array.isArray(dataArray)) {
//       throw new Error("Data must be an array");
//     }

//     const Model = this.getModel(type);
//     return Model.insertMany(dataArray);
//   }

//   static async deleteOne(type, id) {
//     await connectDB();

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid Mongo ID");
//     }

//     const Model = this.getModel(type);
//     const deleted = await Model.findByIdAndDelete(id);

//     if (!deleted) {
//       throw new Error("Item not found");
//     }

//     return deleted;
//   }

//   static async deleteAll(type) {
//     await connectDB();
//     const Model = this.getModel(type);
//     return Model.deleteMany({});
//   }

//   /* ================= ORDERS ================= */

//   static async createOrder(data) {
//     await connectDB();

//     const { email, items } = data;

//     if (!email || !Array.isArray(items) || items.length === 0) {
//       throw new Error("Email and items are required");
//     }

//     const subtotal = items.reduce(
//       (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
//       0
//     );

//     const gst = +(subtotal * 0.05).toFixed(2);
//     const finalTotal = +(subtotal + gst).toFixed(2);

//     return Order.create({
//       email,
//       items,
//       subtotal,
//       gst,
//       finalTotal
//     });
//   }

//   static async getAllOrders() {
//     await connectDB();
//     return Order.find().sort({ createdAt: -1 }).lean();
//   }

//   static async getUserOrders(email) {
//     await connectDB();

//     if (!email) {
//       throw new Error("Email is required");
//     }

//     return Order.find({ email }).sort({ createdAt: -1 }).lean();
//   }

//   static async deleteAllOrders() {
//     await connectDB();
//     return Order.deleteMany({});
//   }
// }

// module.exports = ProductService;







const mongoose = require("mongoose");
const { Veg, Nonveg, Drink, Order } = require("./schema");

/* ================= MAP TYPE → MODEL ================= */
const collectionMap = {
  veg: Veg,
  nonveg: Nonveg,
  drink: Drink,
};

class ProductService {

  /* ================= SAFE MODEL RESOLVER ================= */
  static getModel(type) {
    const key = (type || "").trim().toLowerCase();
    const Model = collectionMap[key];
    if (!Model) {
      throw new Error(`Invalid product type: ${key}`);
    }
    return Model;
  }

  /* ================= PRODUCTS ================= */

  static async getAll(type) {
    try {
      const Model = this.getModel(type);
      return await Model.find({}).sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.error("GET ALL PRODUCTS ERROR:", err.message);
      throw new Error("Failed to fetch products");
    }
  }

  static async saveOne(type, data) {
    try {
      const Model = this.getModel(type);
      if (!data || typeof data !== "object") {
        throw new Error("Invalid product data");
      }
      return await Model.create(data);
    } catch (err) {
      console.error("SAVE ONE PRODUCT ERROR:", err.message);
      throw new Error("Failed to save product");
    }
  }

  static async saveAll(type, dataArray) {
    try {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        throw new Error("Data must be a non-empty array");
      }
      const Model = this.getModel(type);
      return await Model.insertMany(dataArray, { ordered: false });
    } catch (err) {
      console.error("SAVE ALL PRODUCTS ERROR:", err.message);
      throw new Error("Failed to save products");
    }
  }

  static async deleteOne(type, id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Mongo ID");
      }
      const Model = this.getModel(type);
      const deleted = await Model.findByIdAndDelete(id).lean();
      if (!deleted) {
        throw new Error("Item not found");
      }
      return deleted;
    } catch (err) {
      console.error("DELETE ONE PRODUCT ERROR:", err.message);
      throw new Error("Failed to delete product");
    }
  }

  static async deleteAll(type) {
    try {
      const Model = this.getModel(type);
      return await Model.deleteMany({});
    } catch (err) {
      console.error("DELETE ALL PRODUCTS ERROR:", err.message);
      throw new Error("Failed to delete products");
    }
  }

  /* ================= ORDERS ================= */

  static async createOrder(data) {
    try {
      if (!data || typeof data !== "object") {
        throw new Error("Invalid order data");
      }

      const { email, items } = data;
      if (!email || !Array.isArray(items) || items.length === 0) {
        throw new Error("Email and items are required");
      }

      const subtotal = items.reduce(
        (sum, i) =>
          sum +
          (Number(i.price) || 0) *
          (Number(i.quantity) || 1),
        0
      );

      const gst = +(subtotal * 0.05).toFixed(2);
      const finalTotal = +(subtotal + gst).toFixed(2);

      return await Order.create({
        email,
        items,
        subtotal,
        gst,
        finalTotal,
      });
    } catch (err) {
      console.error("CREATE ORDER ERROR:", err.message);
      throw new Error("Failed to create order");
    }
  }

  static async getAllOrders() {
    try {
      return await Order.find({}).sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.error("GET ALL ORDERS ERROR:", err.message);
      throw new Error("Failed to fetch orders");
    }
  }

  static async getUserOrders(email) {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      return await Order.find({ email }).sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.error("GET USER ORDERS ERROR:", err.message);
      throw new Error("Failed to fetch user orders");
    }
  }

  static async deleteAllOrders() {
    try {
      return await Order.deleteMany({});
    } catch (err) {
      console.error("DELETE ALL ORDERS ERROR:", err.message);
      throw new Error("Failed to delete orders");
    }
  }
}

module.exports = ProductService;
