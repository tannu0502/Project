const express = require("express");
const { createTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createTask);

module.exports = router;