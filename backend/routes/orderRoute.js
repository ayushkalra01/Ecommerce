const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  updateStatus,
  getAllOrders,
  createCodOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/all").get(tokenCheck, adminCheck, getAllOrders);
router.route("/cod").post(tokenCheck, createCodOrder);
router
  .route("/")
  .post(tokenCheck, createOrder)
  .get(tokenCheck, getOrders)
  .put(tokenCheck, adminCheck, updateStatus);

module.exports = router;
