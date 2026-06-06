import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import validate from "../../middlewares/validate.middleware.js";

import {
  updateProfileValidation,
  updateRoleValidation,
  updateStatusValidation,
} from "./user.validation.js";

import {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateUserRole,
  updateUserStatus,
} from "./user.controller.js";

const router = express.Router();

/**
 * Get Current Profile
 */
router.get("/profile", verifyJWT, getProfile);

/**
 * Update Current Profile
 */
router.patch(
  "/profile",
  verifyJWT,
  validate(updateProfileValidation),
  updateProfile,
);

/**
 * Get All Users
 */
router.get("/", verifyJWT, authorizeRoles("ADMIN"), getUsers);

/**
 * Get User By Id
 */
router.get("/:id", verifyJWT, authorizeRoles("ADMIN"), getUserById);

/**
 * Update User Role
 */
router.patch(
  "/:id/role",
  verifyJWT,
  authorizeRoles("ADMIN"),
  validate(updateRoleValidation),
  updateUserRole,
);

/**
 * Activate / Deactivate User
 */
router.patch(
  "/:id/status",
  verifyJWT,
  authorizeRoles("ADMIN"),
  validate(updateStatusValidation),
  updateUserStatus,
);

export default router;
