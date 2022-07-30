const express = require("express");
const router = express.Router();
const { tokenCheck } = require("../middleware/authMiddleware");
const { createPaymentIntent } = require("../controllers/stripeController");

router.route("/").post(tokenCheck, createPaymentIntent);

module.exports = router;
