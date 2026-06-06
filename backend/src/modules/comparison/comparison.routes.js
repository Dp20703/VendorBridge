import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import { getComparison } from "./comparison.controller.js";

const router = express.Router();

/**
 * GET /api/comparison/:rfqId
 *
 * Procurement Dashboard
 */
router.get(
  "/:rfqId",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getComparison,
);

export default router;
