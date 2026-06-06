import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
  createVendorValidation,
  updateVendorValidation,
} from "./vendor.validation.js";

import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "./vendor.controller.js";

const router = express.Router();

/**
 * =====================================
 * Vendor Routes
 * Base URL: /api/vendors
 * =====================================
 */

/**
 * Create Vendor
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  validate(createVendorValidation),
  createVendor,
);

/**
 * Get All Vendors
 */
router.get(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getAllVendors,
);

/**
 * Get Vendor By Id
 */
router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getVendorById,
);

/**
 * Update Vendor
 */
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  validate(updateVendorValidation),
  updateVendor,
);

/**
 * Delete Vendor
 */
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN"), deleteVendor);

export default router;
