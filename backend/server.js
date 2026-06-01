const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

console.log("ENV URI:", process.env.MONGO_URI);

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu", menuRoutes);
const mealRoutes = require("./routes/mealRoutes");
app.use("/api/meal", mealRoutes);
const billRoutes = require("./routes/billRoutes");
app.use("/api/bill", billRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});