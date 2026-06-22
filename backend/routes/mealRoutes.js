const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  selectMeal,
  getMeals,
  saveMonthlyPlan,
  getMonthlyPlan,
  getAllMeals, 
} = require("../controllers/mealController");

// 🔐 ADMIN CHECK
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// ✅ NORMAL USER ROUTES
router.get("/", protect, getMeals);
router.post("/", protect, selectMeal);
router.post("/monthly", protect, saveMonthlyPlan);
router.get("/monthly", protect, getMonthlyPlan);

// 🔥 ADMIN ROUTE (FIXED)
router.get("/all", protect, adminOnly, getAllMeals);

module.exports = router;