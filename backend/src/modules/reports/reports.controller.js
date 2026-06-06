import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  getVendorPerformanceReportService,
  getMonthlySpendingReportService,
  getProcurementTrendsReportService,
} from "./reports.service.js";

/**
 * ------------------------------------------------
 * Vendor Performance Report
 * GET /api/reports/vendor-performance
 * ------------------------------------------------
 */
export const getVendorPerformanceReport = asyncHandler(async (req, res) => {
  const report = await getVendorPerformanceReportService();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        report,
        "Vendor performance report generated successfully",
      ),
    );
});

/**
 * ------------------------------------------------
 * Monthly Spending Report
 * GET /api/reports/monthly-spending
 * ------------------------------------------------
 */
export const getMonthlySpendingReport = asyncHandler(async (req, res) => {
  const report = await getMonthlySpendingReportService();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        report,
        "Monthly spending report generated successfully",
      ),
    );
});

/**
 * ------------------------------------------------
 * Procurement Trends Report
 * GET /api/reports/procurement-trends
 * ------------------------------------------------
 */
export const getProcurementTrendsReport = asyncHandler(async (req, res) => {
  const report = await getProcurementTrendsReportService();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        report,
        "Procurement trends report generated successfully",
      ),
    );
});
