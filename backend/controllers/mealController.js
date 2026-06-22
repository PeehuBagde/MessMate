const Meal = require("../models/Meal");
const MonthlyPlan = require("../models/MonthlyPlan");

const COST = {
  NO_MEAL: 650,
  FULL_MEAL_MONTH: 2600,
  ONE_TIME_PER_DAY: 61,
  TEN_DAYS: 950,
  FIFTEEN_DAYS: 1380,
  TWENTY_DAYS: 1800,
};

// Save meal selection
const selectMeal = async (req, res) => {
  try {
    const { date, breakfast, lunch, dinner } = req.body;

if (!date) {
  return res.status(400).json({ message: "Date is required" });
}

    const existing = await Meal.findOne({ userId: req.user.id, date });

let meal;
let message;

if (existing) {
  meal = await Meal.findOneAndUpdate(
    { userId: req.user.id, date },
    { breakfast, lunch, dinner },
    { new: true }
  );
  message = "Meal updated for this day";
} else {
  meal = await Meal.create({
    userId: req.user.id,
    date,
    breakfast,
    lunch,
    dinner,
  });
  message = "Meal saved successfully";
}

res.json({ meal, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get meals of logged-in user
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveMonthlyPlan = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { breakfast, lunch, dinner } = req.body;
    if (breakfast === undefined || lunch === undefined || dinner === undefined) {
      return res.status(400).json({ message: "breakfast, lunch, dinner are required" });
    }

    // get current month like "2026-05"
    const month = new Date().toISOString().slice(0, 7);

    const existing = await MonthlyPlan.findOne({
      userId: req.user.id,
      month,
    });

    const plan = await MonthlyPlan.findOneAndUpdate(
      { userId: req.user.id, month },
      { breakfast, lunch, dinner },
      { new: true, upsert: true }
    );

    res.json({
      message: existing
        ? "Monthly plan updated successfully"
        : "Monthly plan saved successfully",
      plan,
    });

  } catch (error) {
    console.error("saveMonthlyPlan error:", error); // ✅ logs real error in Render
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const month = new Date().toISOString().slice(0, 7);

    const plan = await MonthlyPlan.findOne({
      userId: req.user.id,
      month,
    });

    if (!plan) {
      return res.json({ breakfast: false, lunch: false, dinner: false });
    }

    res.json({
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
    });
  } catch (error) {
    console.error("getMonthlyPlan error:", error); // ✅ logs real error in Render
    res.status(500).json({ message: error.message });
  }
};

// GET ALL MEALS (ADMIN)
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
      .populate("userId", "email") // get user email
      .sort({ date: -1 });

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  selectMeal,
  getMeals,
  saveMonthlyPlan,
  getMonthlyPlan,
  getAllMeals,
};