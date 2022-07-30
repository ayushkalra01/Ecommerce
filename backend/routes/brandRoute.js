const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
} = require("../controllers/brandController");
const router = express.Router();

router.route("/all").get(getAllBrands);
router
  .route("/:slug")
  .get(getBrand)
  .put(tokenCheck, adminCheck, updateBrand)
  .delete(tokenCheck, adminCheck, deleteBrand);
router.route("/").post(tokenCheck, adminCheck, createBrand);

module.exports = router;
