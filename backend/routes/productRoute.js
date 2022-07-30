const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  getSortedProducts,
  createProductReview,
  relatedProduct,
  categoryProducts,
  subCategoryProducts,
  brandProducts,
} = require("../controllers/productController");
const { searchProducts } = require("../controllers/searchController");
const router = express.Router();

router.route("/all").get(getAllProducts).post(getSortedProducts);
router.route("/:id/reviews").post(tokenCheck, createProductReview);
router.route("/:slug/related").get(relatedProduct);
router.route("/category/:slug").get(categoryProducts);
router.route("/subcategory/:slug").get(subCategoryProducts);
router.route("/brand/:slug").get(brandProducts);
router.route("/search/filters").post(searchProducts);
router
  .route("/:slug")
  .get(getProduct)
  .delete(tokenCheck, adminCheck, deleteProduct)
  .put(tokenCheck, adminCheck, updateProduct);
router.route("/").post(tokenCheck, adminCheck, createProduct);

module.exports = router;
