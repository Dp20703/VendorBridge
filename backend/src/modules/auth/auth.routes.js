import express from "express";
import validate from "../middlewares/validate.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
} from "./auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
} from "./auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerValidation), registerUser);

router.post("/login", validate(loginValidation), loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

router.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword,
);

export default router;
