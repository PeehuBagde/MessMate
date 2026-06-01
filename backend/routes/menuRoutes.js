const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { addMenu, getMenus, updateMenu, deleteMenu } = require("../controllers/menuController");

router.put("/:id", protect, adminOnly, updateMenu);
router.delete("/:id", protect, adminOnly, deleteMenu);

// Admin only
router.post("/", protect, adminOnly, addMenu);

// Everyone
router.get("/", protect, getMenus);

module.exports = router;