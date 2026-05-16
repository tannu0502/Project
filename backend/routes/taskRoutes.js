const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createTask);

router.get("/", protect, getTasks);

router.put("/:id/status", protect, updateTaskStatus);

module.exports = router;