const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
} = require("../controllers/subCategoryController");
const router = express.Router();

router.route("/all").get(getAllSubCategories);
router
  .route("/:slug")
  .get(getSubCategory)
  .put(tokenCheck, adminCheck, updateSubCategory)
  .delete(tokenCheck, adminCheck, deleteSubCategory);
router.route("/").post(tokenCheck, adminCheck, createSubCategory);

module.exports = router;
