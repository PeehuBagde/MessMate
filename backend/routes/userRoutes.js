const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to protected profile",
    user: req.user,
  });
});

module.exports = router;