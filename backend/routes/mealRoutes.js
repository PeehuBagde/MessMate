const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { selectMeal, getMeals, saveMonthlyPlan, getMonthlyPlan,} = require("../controllers/mealController");

router.get("/", protect, getMeals); 
router.post("/", protect, selectMeal);
router.post("/monthly", protect, saveMonthlyPlan);
router.get("/monthly", protect, getMonthlyPlan);

module.exports = router;