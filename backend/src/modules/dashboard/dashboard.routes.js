import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
  getDashboardSummary,
  getDashboardCharts,
  getRecentActivity,
} from "./dashboard.controller.js";

const router = express.Router();

/**
 * ------------------------------------------------
 * Dashboard Summary
 * ------------------------------------------------
 */
router.get(
  "/summary",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getDashboardSummary,
);

/**
 * ------------------------------------------------
 * Dashboard Charts
 * ------------------------------------------------
 */
router.get(
  "/charts",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getDashboardCharts,
);

/**
 * ------------------------------------------------
 * Recent Activity
 * ------------------------------------------------
 */
router.get(
  "/recent-activity",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getRecentActivity,
);

export default router;
