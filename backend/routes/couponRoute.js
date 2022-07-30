const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  getAllCoupon,
  createCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const router = express.Router();

router.route("/all").get(getAllCoupon);
router.route("/:id").delete(tokenCheck, adminCheck, deleteCoupon);
router.route("/").post(tokenCheck, adminCheck, createCoupon);

module.exports = router;
