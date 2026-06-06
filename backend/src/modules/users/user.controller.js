import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  getUsersService,
  getUserByIdService,
  updateProfileService,
  updateRoleService,
  updateStatusService,
} from "./user.service.js";

/**
 * Get All Users
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await getUsersService();

  return res
    .status(200)
    .json(new apiResponse(200, users, "Users fetched successfully"));
});

/**
 * Get User By Id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched successfully"));
});

/**
 * Get Current Profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "Profile fetched successfully"));
});

/**
 * Update Current Profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const payload = {};

  if (req.body.firstName) {
    payload["fullName.firstName"] = req.body.firstName;
  }

  if (req.body.lastName) {
    payload["fullName.lastName"] = req.body.lastName;
  }

  if (req.body.phone) {
    payload.phone = req.body.phone;
  }

  const user = await updateProfileService(req.user._id, payload);

  return res
    .status(200)
    .json(new apiResponse(200, user, "Profile updated successfully"));
});

/**
 * Update User Role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await updateRoleService(req.params.id, req.body.role);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, user, "Role updated successfully"));
});

/**
 * Update User Status
 */
export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await updateStatusService(req.params.id, req.body.isActive);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, user, "User status updated successfully"));
});
