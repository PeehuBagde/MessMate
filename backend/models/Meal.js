const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: String,
  breakfast: Boolean,
  lunch: Boolean,
  dinner: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);