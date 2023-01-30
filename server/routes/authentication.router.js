import express from "express";
const router = express.Router();
//controllers
import {
  logIn,
  register,
  secret,
} from "../Controller/authentication.controller.js";
//middleware
import {
  requireSignIn,
  isAdmin,
} from "../Middlewares/authentication.middleware.js";

router.post("/register", register);
router.post("/login", logIn);
router.get("/secret", requireSignIn, isAdmin, secret);

export default router;
