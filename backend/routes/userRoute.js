const express = require("express");
const {
  registerUser,
  currentUser,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} = require("../controllers/userController");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(tokenCheck, registerUser);
router.route("/isvalid").post(tokenCheck, currentUser);
router.route("/isadmin").post(tokenCheck, adminCheck, currentUser);
router.route("/wishlist/:id").put(tokenCheck, removeFromWishlist);
router
  .route("/wishlist")
  .post(tokenCheck, addToWishlist)
  .get(tokenCheck, getUserWishlist);

module.exports = router;
