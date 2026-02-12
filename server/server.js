require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes"); // ✅ ADDED
const loanRoutes = require("./routes/loanRoutes");

const app = express();

// 🔍 TEMP CHECK – add it HERE
console.log("Mongo URI:", process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // ✅ ADDED
app.use("/api/loans", loanRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
