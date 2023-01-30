import express from "express";
const router = express.Router();

//middleware
import {
  isAdmin,
  requireSignIn,
} from "../Middlewares/authentication.middleware.js";
//controllers
import {
  getCategoryById,
  getAllCategoryList,
  removeCategoryById,
  updateCategoryById,
  createCategory,
} from "../Controller/CourseCategory.controllerer.js";

router.post("/category", requireSignIn, isAdmin, createCategory);
router.put("/category/:categoryId", requireSignIn, isAdmin, updateCategoryById);
router.delete(
  "/category/:categoryId",
  requireSignIn,
  isAdmin,
  removeCategoryById
);
router.get("/categories", getAllCategoryList);
router.get("/category/:slug", getCategoryById);

export default router;
