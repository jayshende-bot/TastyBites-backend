



// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// class ProductController {
//   // ================= REGISTER =================
//   static async register(req, res) {
//     try {
//       const { name, email, password, phone, address } = req.body;

//       if (!name || !email || !password || !phone || !address ||
//           !address.house || !address.street || !address.city || !address.state || !address.pincode) {
//         return res.status(400).json({ success: false, message: "All fields including address are required" });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name, email, phone, password: hashedPassword,
//         address: { ...address, pincode: String(address.pincode) },
//       });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(201).json({ success: true, message: "Registration successful", token, user });
//     } catch (error) {
//       console.error("Register Error:", error);
//       res.status(500).json({ success: false, message: "Registration failed" });
//     }
//   }

//   // ================= LOGIN =================
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ success: false, message: "User not found" });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.json({ success: true, message: "Login successful", token, user });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ success: false, message: "Login failed" });
//     }
//   }

//   // ================= PRODUCTS =================
//   static async getAll(type, req, res) {
//     try {
//       const products = await ProductService.getAll(type);
//       res.status(200).json({ success: true, data: products });
//     } catch (error) {
//       console.error("Get Products Error:", error);
//       res.status(500).json({ success: false, message: "Failed to fetch products" });
//     }
//   }

//   static async saveOne(req, res) {
//     try {
//       // ❌ Prevent saving orders via saveOne
//       if (req.params.type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder() API" });
//       }

//       const result = await ProductService.saveOne(req.params.type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       // ❌ Prevent saving orders via saveAll
//       if (req.params.type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder() API" });
//       }

//       const result = await ProductService.saveAll(req.params.type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const result = await ProductService.deleteOne(req.params.type, req.params.id);
//       res.json({ success: true, data: result });
//     } catch (error) {
//       console.error("Delete One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       const result = await ProductService.deleteAll(req.params.type);
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   // ================= ORDERS =================
//   // static async createOrder(req, res) {
//   //   try {
//   //     const order = await ProductService.createOrder(req.body);
//   //     res.status(201).json({ success: true, message: "Order placed successfully", data: order });
//   //   } catch (error) {
//   //     console.error("Create Order Error:", error);
//   //     res.status(500).json({ success: false, message: error.message });
//   //   }
//   // }



//   static async createOrder(req, res) {
//   try {
//     // 🧪 DEBUG: log incoming request
//     console.log("REQ BODY:", req.body);

//     const { email, items } = req.body;

//     // ❌ Validate email & items
//     if (!email || !items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and items are required, and items must be a non-empty array",
//       });
//     }

//     // ✅ Call ProductService
//     const order = await ProductService.createOrder(req.body);

//     res.status(201).json({ success: true, message: "Order placed successfully", data: order });
//   } catch (error) {
//     console.error("Create Order Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }


//   static async getUserOrders(req, res) {
//     try {
//       const orders = await ProductService.getUserOrders(req.params.email);
//       res.json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get User Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async getAllOrders(req, res) {
//     try {
//       const orders = await ProductService.getAllOrders();
//       res.json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAllOrders(req, res) {
//     try {
//       const result = await ProductService.deleteAllOrders();
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }
// }

// module.exports = ProductController;




// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// class ProductController {
//   // ================= REGISTER =================
//   static async register(req, res) {
//     try {
//       const { name, email, password, phone, address } = req.body;

//       if (!name || !email || !password || !phone || !address ||
//           !address.house || !address.street || !address.city || !address.state || !address.pincode) {
//         return res.status(400).json({ success: false, message: "All fields including address are required" });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ success: false, message: "Email already registered" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         address: { ...address, pincode: String(address.pincode) },
//       });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(201).json({ success: true, message: "Registration successful", token, user });
//     } catch (error) {
//       console.error("Register Error:", error);
//       res.status(500).json({ success: false, message: "Registration failed" });
//     }
//   }

//   // ================= LOGIN =================
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ success: false, message: "User not found" });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(200).json({ success: true, message: "Login successful", token, user });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ success: false, message: "Login failed" });
//     }
//   }

//   // ================= GET PRODUCTS =================
//   static async getAll(type, req, res) {
//     try {
//       // ✅ Validate type
//       if (!["veg", "nonveg", "drink"].includes(type)) {
//         return res.status(400).json({ success: false, message: "Invalid product type" });
//       }

//       const products = await ProductService.getAll(type);
//       res.status(200).json({ success: true, data: products });
//     } catch (error) {
//       console.error(`Get ${type} Products Error:`, error);
//       res.status(500).json({ success: false, message: "Failed to fetch products" });
//     }
//   }

//   // ================= SAVE / DELETE PRODUCTS =================
//   static async saveOne(req, res) {
//     try {
//       const { type } = req.params;
//       if (type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder API" });
//       }

//       const result = await ProductService.saveOne(type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       const { type } = req.params;
//       if (type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder API" });
//       }

//       const result = await ProductService.saveAll(type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const { type, id } = req.params;
//       const result = await ProductService.deleteOne(type, id);
//       res.status(200).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Delete One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       const { type } = req.params;
//       const result = await ProductService.deleteAll(type);
//       res.status(200).json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   // ================= ORDERS =================
//   static async createOrder(req, res) {
//     try {
//       const { email, items } = req.body;

//       if (!email || !items || !Array.isArray(items) || items.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Email and items are required, and items must be a non-empty array",
//         });
//       }

//       const order = await ProductService.createOrder(req.body);
//       res.status(201).json({ success: true, message: "Order placed successfully", data: order });
//     } catch (error) {
//       console.error("Create Order Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async getUserOrders(req, res) {
//     try {
//       const { email } = req.params;
//       if (!email) return res.status(400).json({ success: false, message: "Email is required" });

//       const orders = await ProductService.getUserOrders(email);
//       res.status(200).json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get User Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async getAllOrders(req, res) {
//     try {
//       const orders = await ProductService.getAllOrders();
//       res.status(200).json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAllOrders(req, res) {
//     try {
//       const result = await ProductService.deleteAllOrders();
//       res.status(200).json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }
// }

// module.exports = ProductController;

// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// class ProductController {
//   // ================= REGISTER =================
//   static async register(req, res) {
//     try {
//       const { name, email, password, phone, address } = req.body;

//       if (!name || !email || !password || !phone || !address ||
//           !address.house || !address.street || !address.city || !address.state || !address.pincode) {
//         return res.status(400).json({ success: false, message: "All fields including address are required" });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ success: false, message: "Email already registered" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         address: { ...address, pincode: String(address.pincode) },
//       });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(201).json({ success: true, message: "Registration successful", token, user });
//     } catch (error) {
//       console.error("Register Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Registration failed" });
//     }
//   }

//   // ================= LOGIN =================
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ success: false, message: "User not found" });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(200).json({ success: true, message: "Login successful", token, user });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Login failed" });
//     }
//   }static async getAll(req, res) {
//   try {
//     const { type } = req.params;

//     console.log("GET PRODUCTS TYPE:", type);

//     if (!["veg", "nonveg", "drink"].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid product type"
//       });
//     }

//     const products = await ProductService.getAll(type);

//     return res.status(200).json({
//       success: true,
//       data: products || []
//     });
//   } catch (error) {
//     console.error("GetAll Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// }



//   // ================= SAVE / DELETE PRODUCTS =================
//   static async saveOne(req, res) {
//     try {
//       const { type } = req.params;
//       if (type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder API" });
//       }

//       const result = await ProductService.saveOne(type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save One Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to save product" });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       const { type } = req.params;
//       if (type === "order") {
//         return res.status(400).json({ success: false, message: "Orders must be created using createOrder API" });
//       }

//       const result = await ProductService.saveAll(type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save All Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to save products" });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const { type, id } = req.params;
//       const result = await ProductService.deleteOne(type, id);
//       res.status(200).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Delete One Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to delete product" });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       const { type } = req.params;
//       const result = await ProductService.deleteAll(type);
//       res.status(200).json({ success: true, deletedCount: result.deletedCount || 0 });
//     } catch (error) {
//       console.error("Delete All Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to delete products" });
//     }
//   }

//   // ================= ORDERS =================
//   static async createOrder(req, res) {
//     try {
//       const { email, items } = req.body;
//       if (!email || !items || !Array.isArray(items) || items.length === 0) {
//         return res.status(400).json({ success: false, message: "Email and items are required, and items must be a non-empty array" });
//       }

//       const order = await ProductService.createOrder(req.body);
//       res.status(201).json({ success: true, message: "Order placed successfully", data: order });
//     } catch (error) {
//       console.error("Create Order Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to create order" });
//     }
//   }

//   static async getUserOrders(req, res) {
//     try {
//       const { email } = req.params;
//       if (!email) return res.status(400).json({ success: false, message: "Email is required" });

//       const orders = await ProductService.getUserOrders(email);
//       res.status(200).json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get User Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to fetch user orders" });
//     }
//   }

//   static async getAllOrders(req, res) {
//     try {
//       const orders = await ProductService.getAllOrders();
//       res.status(200).json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to fetch all orders" });
//     }
//   }

//   static async deleteAllOrders(req, res) {
//     try {
//       const result = await ProductService.deleteAllOrders();
//       res.status(200).json({ success: true, deletedCount: result.deletedCount || 0 });
//     } catch (error) {
//       console.error("Delete All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message || "Failed to delete all orders" });
//     }
//   }
// }

// module.exports = ProductController;





//  ///   thirdd codee  ///  
// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const connectDB = require("./db"); // ✅ ADD THIS

// class ProductController {

//   // ================= REGISTER =================
//   static async register(req, res) {
//     try {
//       await connectDB(); // ✅ IMPORTANT

//       const { name, email, password, phone, address } = req.body;

//       if (
//         !name || !email || !password || !phone || !address ||
//         !address.house || !address.street || !address.city ||
//         !address.state || !address.pincode
//       ) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields including address are required"
//         });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already registered"
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         address: { ...address, pincode: String(address.pincode) }
//       });

//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//       );

//       return res.status(201).json({
//         success: true,
//         message: "Registration successful",
//         token,
//         user
//       });

//     } catch (error) {
//       console.error("Register Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Registration failed"
//       });
//     }
//   }

//   // ================= LOGIN =================
//   static async login(req, res) {
//     try {
//       await connectDB(); // ✅ IMPORTANT

//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: "Email and password are required"
//         });
//       }

//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found"
//         });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid email or password"
//         });
//       }

//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Login successful",
//         token,
//         user
//       });

//     } catch (error) {
//       console.error("Login Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Login failed"
//       });
//     }
//   }

//   // ================= GET PRODUCTS =================
//   static async getAll(req, res) {
//     try {
//       await connectDB(); // ✅ THIS FIXES /products/veg

//       const { type } = req.params;

//       if (!["veg", "nonveg", "drink"].includes(type)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid product type"
//         });
//       }

//       const products = await ProductService.getAll(type);

//       return res.status(200).json({
//         success: true,
//         count: products.length,
//         data: products
//       });

//     } catch (error) {
//       console.error("GetAll Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch products"
//       });
//     }
//   }

//   // ================= ADMIN PRODUCTS =================
//   static async saveOne(req, res) {
//     try {
//       await connectDB();

//       const result = await ProductService.saveOne(req.params.type, req.body);
//       return res.status(201).json({ success: true, data: result });

//     } catch (error) {
//       console.error("Save One Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to save product"
//       });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       await connectDB();

//       const result = await ProductService.saveAll(req.params.type, req.body);
//       return res.status(201).json({ success: true, data: result });

//     } catch (error) {
//       console.error("Save All Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to save products"
//       });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       await connectDB();

//       const result = await ProductService.deleteOne(req.params.type, req.params.id);
//       return res.status(200).json({ success: true, data: result });

//     } catch (error) {
//       console.error("Delete One Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete product"
//       });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       await connectDB();

//       const result = await ProductService.deleteAll(req.params.type);
//       return res.status(200).json({
//         success: true,
//         deletedCount: result.deletedCount || 0
//       });

//     } catch (error) {
//       console.error("Delete All Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete products"
//       });
//     }
//   }
// }

// module.exports = ProductController;const bcrypt = require("bcryptjs");



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const ProductService = require("./ProductService");
const User = require("./userSchema");

class ProductController {

  /* ========== AUTH ========== */

  static async register(req, res) {
    try {
      await connectDB();

      const { name, email, password, phone, address } = req.body;

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        phone,
        password: hashed,
        address,
      });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        token,
        user,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async login(req, res) {
    try {
      await connectDB();

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ success: true, token, user });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ========== PRODUCTS ========== */

  static async getAll(req, res) {
    try {
      await connectDB();

      const type = req.params.type.toLowerCase();
      const data = await ProductService.getAll(type);

      res.json({ success: true, data });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async saveOne(req, res) {
    try {
      await connectDB();
      const data = await ProductService.saveOne(req.params.type, req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async saveAll(req, res) {
    try {
      await connectDB();
      const data = await ProductService.saveAll(req.params.type, req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteOne(req, res) {
    try {
      await connectDB();
      const data = await ProductService.deleteOne(req.params.type, req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await connectDB();
      const result = await ProductService.deleteAll(req.params.type);
      res.json({ success: true, deleted: result.deletedCount });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  /* ========== ORDERS ========== */

  static async createOrder(req, res) {
    try {
      await connectDB();
      const order = await ProductService.createOrder(req.body);
      res.status(201).json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      await connectDB();
      const orders = await ProductService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getUserOrders(req, res) {
    try {
      await connectDB();
      const orders = await ProductService.getUserOrders(req.params.email);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteAllOrders(req, res) {
    try {
      await connectDB();
      await ProductService.deleteAllOrders();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = ProductController;

