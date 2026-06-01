const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { calculateBill } = require("../controllers/billController");

router.get("/", protect, calculateBill);

module.exports = router;