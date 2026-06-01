const mongoose = require("mongoose");

const monthlyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  month: String,
  breakfast: Boolean,
  lunch: Boolean,
  dinner: Boolean,
});

module.exports = mongoose.model("MonthlyPlan", monthlyPlanSchema);