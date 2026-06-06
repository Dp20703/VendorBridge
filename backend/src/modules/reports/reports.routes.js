import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
  getVendorPerformanceReport,
  getMonthlySpendingReport,
  getProcurementTrendsReport,
} from "./reports.controller.js";

const router = express.Router();

/**
 * ------------------------------------------------
 * Vendor Performance Report
 * ------------------------------------------------
 */
router.get(
  "/vendor-performance",
  verifyJWT,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT",
    "MANAGER"
  ),
  getVendorPerformanceReport
);

/**
 * ------------------------------------------------
 * Monthly Spending Report
 * ------------------------------------------------
 */
router.get(
  "/monthly-spending",
  verifyJWT,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT",
    "MANAGER"
  ),
  getMonthlySpendingReport
);

/**
 * ------------------------------------------------
 * Procurement Trends Report
 * ------------------------------------------------
 */
router.get(
  "/procurement-trends",
  verifyJWT,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT",
    "MANAGER"
  ),
  getProcurementTrendsReport
);

export default router;