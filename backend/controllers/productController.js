const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productSchema = require("../models/productModel");
const userSchema = require("../models/userModel");
const categorySchema = require("../models/categoryModel");
const subCategorySchema = require("../models/subCategoryModel");
const brandSchema = require("../models/brandModel");

//@desc   Create Product
//@routes POST /api/product
//@access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await new productSchema(req.body).save();
  res.status(201).json(newProduct);
});

//@desc   Get All Products
//@routes GET /api/product/all
//@access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category || "all";
  const pageSize = 3;

  let products;
  let count;
  if (category !== "all") {
    count = await productSchema.countDocuments({ category });
    products = await productSchema
      .find({ category })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } else {
    count = await productSchema.countDocuments({});
    products = await productSchema
      .find({})
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc   Delete Product
//@routes DELETE /api/product/:slug
//@access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findOne({
    slug: req.params.slug,
  });
  if (product) {
    await product.remove();
    res.json({
      message: `Product ${req.params.slug} Deleted Successfully`,
    });
  } else {
    res.status(404);
    throw new Error(`Product ${req.params.slug} not found`);
  }
});

//@desc   Get Product
//@routes GET /api/product/:slug
//@access PUBLIC
const getProduct = asyncHandler(async (req, res) => {
  const product = await productSchema
    .findOne({
      slug: req.params.slug,
    })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .exec();
  res.json(product);
});

//@desc   Update Product
//@routes PUT /api/product/:slug
//@access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await productSchema
    .findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
    .exec();
  res.json(updatedProduct);
});

//@desc   Get Sorted Products
//@routes POST /api/product/all
//@access PUBLIC
const getSortedProducts = asyncHandler(async (req, res) => {
  const { sort, order, page } = req.body;
  const pageSize = 3;
  const count = await productSchema.countDocuments({});
  const products = await productSchema
    .find({})
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .sort([[sort, order]])
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc    Create new Review
//@routes  POST /api/product/:id/reviews
//@access  PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const { rateValue, comment } = req.body;
  const product = await productSchema.findById(req.params.id);

  const { email } = req.user;
  const user = await userSchema.findOne({ email });

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );

    const review = {
      name: user.name,
      rating: Number(rateValue),
      comment,
      user: user._id,
    };

    if (alreadyReviewed) {
      console.log(alreadyReviewed);
      alreadyReviewed.rating = Number(rateValue);
      alreadyReviewed.comment = comment;
    } else {
      product.reviews.push(review);
    }

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, currItem) => currItem.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc    Get related products
//@routes  POST /api/product/:id/related
//@access  PUBLIC
const relatedProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findOne({
    slug: req.params.slug,
  });
  //$ne not including
  const related = await productSchema
    .find({
      _id: { $ne: product._id },
      category: product.category,
    })
    .limit(3)
    .populate("category")
    .populate("subCategory")
    .populate("brand");
  res.json(related);
});

//@desc    Get products by category
//@routes  POST /api/product/category/:slug
//@access  PUBLIC
const categoryProducts = asyncHandler(async (req, res) => {
  let page = Number(req.query.pageNumber) || 1;
  const category = await categorySchema.findOne({ slug: req.params.slug });
  const pageSize = 3;
  if (category) {
    const count = await productSchema.countDocuments({ category });
    page = (page - 1) * 3 >= count ? 1 : page;
    const products = await productSchema
      .find({ category })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error(`Category ${req.params.slug} not found`);
  }
});

//@desc    Get products by subCategory
//@routes  POST /api/product/subcategory/:slug
//@access  PUBLIC
const subCategoryProducts = asyncHandler(async (req, res) => {
  let page = Number(req.query.pageNumber) || 1;
  const sub = await subCategorySchema.findOne({ slug: req.params.slug });
  const pageSize = 3;
  if (sub) {
    const count = await productSchema.countDocuments({ subCategory: sub });
    page = (page - 1) * 3 >= count ? 1 : page;
    const products = await productSchema
      .find({ subCategory: sub })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error(`SubCategory ${req.params.slug} not found`);
  }
});

//@desc    Get products by brands
//@routes  POST /api/product/brand/:slug
//@access  PUBLIC
const brandProducts = asyncHandler(async (req, res) => {
  let page = Number(req.query.pageNumber) || 1;
  const brand = await brandSchema.findOne({ slug: req.params.slug });
  const pageSize = 3;
  if (brand) {
    const count = await productSchema.countDocuments({ brand });
    page = (page - 1) * 3 >= count ? 1 : page;
    const products = await productSchema
      .find({ brand })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error(`Brand ${req.params.slug} not found`);
  }
});

module.exports = {
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
};

// res.status(400);
// throw new Error("Product already reviewed");
// $elemMatch -> element match
// $push:{reviews:{rating:Number(rateValue),name:user.name,comment,user:user._id}}

// const reviewUpdated = await productSchema.updateOne(
//     {
//         reviews: { $elemMatch: alreadyReviewed },
//     },
//     {
//       $set: {
//           "$reviews.$.rating": Number(rateValue),
//           "$reviews.$.comment": comment,
//       },
//     }
// );

//Text Search Query
//const products = await productSchema
//.find({ $text: { $search: query } })
