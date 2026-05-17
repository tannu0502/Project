const express = require("express");
const { getMembers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/members", protect, adminOnly, getMembers);

module.exports = router;