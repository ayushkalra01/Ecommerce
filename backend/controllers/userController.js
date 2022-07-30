const userSchema = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@desc   Register User
//@routes POST /api/users/register
//@access PRIVATE
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, picture } = req.user;
  const user = await userSchema.findOne({ email });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: req.user.token,
      address: user.address,
    });
  } else {
    const newUser = await new userSchema({
      email,
      name: email.split("@")[0],
      picture,
    }).save();

    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: req.user.token,
    });
  }
});

//@desc   Check User
//@routes POST /api/users/isAdmin,isValid
//@access PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  const { email } = req.user;
  userSchema.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
});

//@desc   Add to Wishlist
//@routes POST /api/users/wishlist
//@access PRIVATE
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  // $addToSet -> no duplicate will add in wishlist
  const user = await userSchema
    .findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } },
      { new: true }
    )
    .exec();
  res.json({ success: true });
});

//@desc   Remove from Wishlist
//@routes PUT /api/users/wishlist/:id
//@access PRIVATE
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userSchema
    .findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: id } })
    .exec();
  res.json({ success: true });
});

//@desc   Get User Wishlist
//@routes GET /api/users/wishlist
//@access PRIVATE
const getUserWishlist = asyncHandler(async (req, res) => {
  const list = await userSchema
    .findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
});

module.exports = {
  registerUser,
  currentUser,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};
