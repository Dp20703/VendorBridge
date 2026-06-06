import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { createRfqValidation, updateRfqValidation } from "./rfq.validation.js";

import {
  createRfq,
  getAllRfqs,
  getRfqById,
  updateRfq,
  deleteRfq,
} from "./rfq.controller.js";

const router = express.Router();

/**
 * Create RFQ
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  validate(createRfqValidation),
  createRfq,
);

/**
 * Get All RFQs
 */
router.get(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getAllRfqs,
);

/**
 * Get RFQ By Id
 */
router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getRfqById,
);

/**
 * Update RFQ
 */
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  validate(updateRfqValidation),
  updateRfq,
);

/**
 * Delete RFQ
 */
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN"), deleteRfq);

export default router;
