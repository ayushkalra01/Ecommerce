const categorySchema = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//@desc   Create Category
//@routes POST /api/category
//@access PRIVATE/ADMIN
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await new categorySchema({
    name,
    slug: slugify(name),
  }).save();

  res.json(category);
});

//@desc   Get Category
//@routes GET /api/category/:slug
//@access PUBLIC
const getCategory = asyncHandler(async (req, res) => {
  const category = await categorySchema.findOne({ slug: req.params.slug });
  if (category) {
    res.json(category);
  } else {
    res.json({ message: `Category ${req.params.slug} Not Found` }).status(404);
  }
});

//@desc   Get All Categories
//@routes GET /api/category/all
//@access PUBLIC
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categorySchema
    .find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(categories);
});

//@desc   Update Category
//@routes PUT /api/category/:slug
//@access PRIVATE/ADMIN
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categorySchema.findOne({ slug: req.params.slug });

  if (category) {
    category.name = name;
    category.slug = slugify(name);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error(`Category ${req.params.slug} not found`);
  }
});

//@desc   Delete Category
//@routes DELETE /api/category/:slug
//@access PRIVATE/ADMIN
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await categorySchema.findOne({ slug: req.params.slug });
  if (category) {
    await category.remove();
    res.json({ message: `Category ${req.params.slug} Deleted Successfully` });
  } else {
    res.status(404);
    throw new Error(`Category ${req.params.slug} not found`);
  }
});

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
};

//exports.createCategory = (req,res)=>{}
