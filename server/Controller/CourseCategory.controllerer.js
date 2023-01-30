import slugify from "slugify";
import Category from "../Model/CourseCategory.mongo";

export const createCategory = async (req, res) => {
  try {
    const { name } = await req.body;
    if (!name.trim()) {
      return res.status(401).json({ error: "name is required" });
    }
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(401).json({ error: "already exist" });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const updateCategoryById = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
export const removeCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const removed = await Category.findByIdAndDelete(categoryId);
    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
export const getAllCategoryList = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
