const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const subCategorySchema = require("../models/subCategoryModel");

//@desc   Create SubCategory
//@routes POST /api/subcategory
//@access PRIVATE/ADMIN
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await new subCategorySchema({
    name,
    slug: slugify(name),
    category,
  }).save();

  res.json(subCategory);
});

//@desc   Get SubCategory
//@routes GET /api/subcategory/:slug
//@access PUBLIC
const getSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategorySchema.findOne({
    slug: req.params.slug,
  });
  if (subCategory) {
    res.json(subCategory);
  } else {
    res
      .json({ message: `SubCategory ${req.params.slug} Not Found` })
      .status(404);
  }
});

//@desc   Get All SubCategories
//@routes GET /api/subcategory/all
//@access PUBLIC
const getAllSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await subCategorySchema
    .find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(subCategories);
});

//@desc   Update SubCategory
//@routes PUT /api/subcategory/:slug
//@access PRIVATE/ADMIN
const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategorySchema.findOne({
    slug: req.params.slug,
  });

  if (subCategory) {
    subCategory.name = name;
    subCategory.slug = slugify(name);
    subCategory.category = category;
    const updatedSubCategory = await subCategory.save();
    res.json(updatedSubCategory);
  } else {
    res.status(404);
    throw new Error(`SubCategory ${req.params.slug} not found`);
  }
});

//@desc   Delete Category
//@routes DELETE /api/subcategory/:slug
//@access PRIVATE/ADMIN
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategorySchema.findOne({
    slug: req.params.slug,
  });
  if (subCategory) {
    await subCategory.remove();
    res.json({
      message: `SubCategory ${req.params.slug} Deleted Successfully`,
    });
  } else {
    res.status(404);
    throw new Error(`SubCategory ${req.params.slug} not found`);
  }
});

module.exports = {
  createSubCategory,
  getSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
};
