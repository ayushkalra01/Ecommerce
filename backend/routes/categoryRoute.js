const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/all").get(getAllCategories);
router
  .route("/:slug")
  .get(getCategory)
  .put(tokenCheck, adminCheck, updateCategory)
  .delete(tokenCheck, adminCheck, deleteCategory);
router.route("/").post(tokenCheck, adminCheck, createCategory);

module.exports = router;
