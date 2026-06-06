import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
  createApprovalValidation,
  updateApprovalValidation,
} from "./approval.validation.js";

import { createApproval, updateApproval } from "./approval.controller.js";

const router = express.Router();

/**
 * Create Approval Request
 *
 * PROCUREMENT / ADMIN
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  validate(createApprovalValidation),
  createApproval,
);

/**
 * Approve / Reject
 *
 * MANAGER / ADMIN
 */
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "MANAGER"),
  validate(updateApprovalValidation),
  updateApproval,
);

export default router;
