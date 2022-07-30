const asyncHandler = require("express-async-handler");
const productSchema = require("../models/productModel");

const handleQuery = asyncHandler(async (req, res, query) => {
  const searchTitle = query
    ? {
        title: { $regex: query, $options: "i" },
      }
    : {};

  const searchDesc = query
    ? {
        description: { $regex: query, $options: "i" },
      }
    : {};

  const productsTitle = await productSchema
    .find({ ...searchTitle })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();

  const productsDesc = await productSchema
    .find({ ...searchDesc })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();

  let products = [];
  let productSet = new Set();
  if (productsTitle.length > 0) {
    productsTitle.forEach((p) => productSet.add(p._id.toString()));
  }
  if (productsDesc.length > 0) {
    productsDesc.forEach((p) => {
      productSet.add(p._id.toString());
    });
  }
  for (let item of productSet.keys()) {
    const result = await productSchema.findById({ _id: item });
    products.push(result);
  }

  return products;
});

const handlePrice = asyncHandler(async (req, res, price) => {
  let products = await productSchema
    .find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

const handleCategory = asyncHandler(async (req, res, category) => {
  let products = await productSchema
    .find({ category })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

const handleRating = asyncHandler(async (req, res, rating) => {
  const aggregateId = await productSchema.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: "$rating",
        },
      },
    },
    { $match: { floorAverage: rating } },
  ]);

  const products = await productSchema.find({ _id: aggregateId });
  return products;
});

const handleSubCategory = asyncHandler(async (req, res, sub) => {
  let products = await productSchema
    .find({ subCategory: sub._id })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

const handleBrand = asyncHandler(async (req, res, brand) => {
  let products = await productSchema
    .find({ brand })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

const handleColor = asyncHandler(async (req, res, color) => {
  let products = await productSchema
    .find({ color })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

const handleShip = asyncHandler(async (req, res, ship) => {
  let products = await productSchema
    .find({ shipping: ship })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("brand", "_id name")
    .exec();
  return products;
});

//@desc    Get products by brands
//@routes  POST /api/product/search/filters
//@access  PUBLIC
const searchProducts = asyncHandler(async (req, res) => {
  const { query, price, category, rating, sub, brand, color, ship, page } =
    req.body;

  const pageSize = 3;
  let p = Number(page) ? Number(page) : 1;

  let queryProducts = [];
  let priceProducts = [];
  let categoryProducts = [];
  let ratingProducts = [];
  let subCategoryProducts = [];
  let brandProducts = [];
  let colorProducts = [];
  let shipProducts = [];
  let products = [];
  let productsId = [];

  // Handle Query
  if (query !== undefined && query.length !== 0) {
    queryProducts = await handleQuery(req, res, query);
  }

  // Handle Price
  if (price !== undefined) {
    priceProducts = await handlePrice(req, res, price);
  }

  // Handle Category
  if (category !== undefined && category.length !== 0) {
    categoryProducts = await handleCategory(req, res, category);
  }

  // Handle Ratings
  if (rating !== undefined && rating !== 0) {
    ratingProducts = await handleRating(req, res, rating);
  }

  // Handle SubCategory
  if (sub !== undefined && sub.length !== 0) {
    subCategoryProducts = await handleSubCategory(req, res, sub);
  }
  // Handle Brands
  if (brand !== undefined && brand.length !== 0) {
    brandProducts = await handleBrand(req, res, brand);
  }

  // Handle colors
  if (color !== undefined && color.length !== 0) {
    colorProducts = await handleColor(req, res, color);
  }

  // Handle Shipping
  if (ship !== undefined && ship.length !== 0) {
    shipProducts = await handleShip(req, res, ship);
  }

  if (
    (query !== undefined && query.length !== 0 && queryProducts.length === 0) ||
    (price !== undefined &&
      (price[0] !== 0 || price[1] !== 0) &&
      priceProducts.length === 0) ||
    (category !== undefined &&
      category.length !== 0 &&
      categoryProducts.length === 0) ||
    (rating !== undefined && rating !== 0 && ratingProducts.length === 0) ||
    (sub !== undefined &&
      sub.length !== 0 &&
      subCategoryProducts.length === 0) ||
    (brand !== undefined && brand.length !== 0 && brandProducts.length == 0) ||
    (color !== undefined && color.length !== 0 && colorProducts.length == 0) ||
    (ship !== undefined && ship.length !== 0 && shipProducts.length == 0)
  ) {
    res.json(products);
  }

  let queryId = [];
  if (queryProducts.length > 0) {
    queryProducts.forEach((p) => queryId.push(p._id.toString()));
    productsId.push(queryId);
  }

  let priceId = [];
  if (priceProducts.length > 0) {
    priceProducts.forEach((p) => priceId.push(p._id.toString()));
    productsId.push(priceId);
  }

  let categoryId = [];
  if (categoryProducts.length > 0) {
    categoryProducts.forEach((p) => categoryId.push(p._id.toString()));
    productsId.push(categoryId);
  }

  let ratingId = [];
  if (ratingProducts.length > 0) {
    ratingProducts.forEach((p) => ratingId.push(p._id.toString()));
    productsId.push(ratingId);
  }

  let subId = [];
  if (subCategoryProducts.length > 0) {
    subCategoryProducts.forEach((s) => subId.push(s._id.toString()));
    productsId.push(subId);
  }

  let brandId = [];
  if (brandProducts.length > 0) {
    brandProducts.forEach((s) => brandId.push(s._id.toString()));
    productsId.push(brandId);
  }

  let colorId = [];
  if (colorProducts.length > 0) {
    colorProducts.forEach((s) => colorId.push(s._id.toString()));
    productsId.push(colorId);
  }

  let shipId = [];
  if (shipProducts.length > 0) {
    shipProducts.forEach((s) => shipId.push(s._id.toString()));
    productsId.push(shipId);
  }

  let finalProductId =
    productsId.length > 0
      ? productsId.shift().filter((v) => {
          return productsId.every((a) => {
            return a.indexOf(v) !== -1;
          });
        })
      : [];

  let count = 0;
  if (finalProductId.length > 0) {
    count = await productSchema.countDocuments({ _id: finalProductId });
    products = await productSchema
      .find({ _id: finalProductId })
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .limit(pageSize)
      .skip(pageSize * (p - 1));
  }
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

module.exports = { searchProducts };

// for (let item of finalProductId) {
//   const result = await productSchema.findById({ _id: item });
//   products.push(result);
// }
