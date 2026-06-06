import User from "../users/user.model.js";

import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import sendToken from "../../utils/sendToken.js";

import { registerUserService, loginUserService } from "./auth.service.js";

/* ==========================================
   REGISTER
========================================== */

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, role } = req.body;

  const user = await registerUserService({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
  });

  const token = user.generateAuthToken();

  // Set JWT cookie
  sendToken(res, token);

  return res.status(201).json(
    new apiResponse(
      201,
      {
        user,
        token,
      },
      "Registration successful",
    ),
  );
});

/* ==========================================
   LOGIN
========================================== */

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  const token = user.generateAuthToken();

  // Set JWT cookie
  sendToken(res, token);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        user,
        token,
      },
      "Login successful",
    ),
  );
});

/* ==========================================
   CURRENT USER
========================================== */

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "Current user fetched"));
});

/* ==========================================
   LOGOUT
========================================== */

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json(new apiResponse(200, null, "Logout successful"));
});

/* ==========================================
   FORGOT PASSWORD
========================================== */

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        null,
        "Password reset feature will be implemented later",
      ),
    );
});
