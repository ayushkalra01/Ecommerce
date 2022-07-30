const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const brandSchema = require("../models/brandModel");

//@desc   Create Brand
//@routes POST /api/brand
//@access PRIVATE/ADMIN
const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const brand = await new brandSchema({
    name,
    slug: slugify(name),
    category,
  }).save();

  res.json(brand);
});

//@desc   Get Brand
//@routes GET /api/brand/:slug
//@access PUBLIC
const getBrand = asyncHandler(async (req, res) => {
  const brand = await brandSchema.findOne({
    slug: req.params.slug,
  });
  if (brand) {
    res.json(brand);
  } else {
    res.json({ message: `Brand ${req.params.slug} Not Found` }).status(404);
  }
});

//@desc   Get All Brands
//@routes GET /api/brand/all
//@access PUBLIC
const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await brandSchema.find({}).sort({ createdAt: -1 }).exec();
  res.json(brands);
});

//@desc   Update brand
//@routes PUT /api/brand/:slug
//@access PRIVATE/ADMIN
const updateBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const brand = await brandSchema.findOne({
    slug: req.params.slug,
  });

  if (brand) {
    brand.name = name;
    brand.slug = slugify(name);
    brand.category = category;
    const updatedbrand = await brand.save();
    res.json(updatedbrand);
  } else {
    res.status(404);
    throw new Error(`Brand ${req.params.slug} not found`);
  }
});

//@desc   Delete Brand
//@routes DELETE /api/brand/:slug
//@access PRIVATE/ADMIN
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await brandSchema.findOne({
    slug: req.params.slug,
  });
  if (brand) {
    await brand.remove();
    res.json({
      message: `Brand ${req.params.slug} Deleted Successfully`,
    });
  } else {
    res.status(404);
    throw new Error(`Brand ${req.params.slug} not found`);
  }
});

module.exports = {
  createBrand,
  getBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
};
