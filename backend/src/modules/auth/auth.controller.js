import User from "./uuser.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import { registerUserService, loginUserService } from "./auth.service.js";

/* REGISTER */

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

  return res.status(201).json(
    new apiResponse(201, "Registration successful", {
      user,
      token,
    }),
  );
});

/* LOGIN */

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  const token = user.generateAuthToken();

  return res.status(200).json(
    new apiResponse(200, "Login successful", {
      user,
      token,
    }),
  );
});

/* CURRENT USER */

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, "Current user fetched", req.user));
});

/* LOGOUT */

export const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new apiResponse(200, "Logout successful"));
});

/* FORGOT PASSWORD */

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, "Password reset feature will be implemented later"),
    );
});
