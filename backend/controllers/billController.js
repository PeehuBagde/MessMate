const Meal = require("../models/Meal");

// Calculate monthly bill
const calculateBill = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all meals for this user
    const meals = await Meal.find({ userId });

    // Count total days (entries)
    const totalDays = meals.length;

    let mealCost = 0;
    let type = "";

    // No meals → only base charge
    if (totalDays === 0) {
      return res.json({
        base: 650,
        mealCost: 0,
        total: 650,
        type: "No Meal (Base Charge)",
      });
    }

    // Plan logic
    if (totalDays >= 26) {
      mealCost = 2600;
      type = "Full Meal Plan";
    } else if (totalDays >= 20) {
      mealCost = 1800;
      type = "20 Days Plan";
    } else if (totalDays >= 15) {
      mealCost = 1380;
      type = "15 Days Plan";
    } else if (totalDays >= 10) {
      mealCost = 950;
      type = "10 Days Plan";
    } else {
      mealCost = totalDays * 61;
      type = "Per Day Plan";
    }

    // Final total = base + meal cost
    const total = 650 + mealCost;

    res.json({
      base: 650,
      mealCost,
      total,
      type,
      totalDays,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { calculateBill };