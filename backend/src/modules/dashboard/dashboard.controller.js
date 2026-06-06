import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  getDashboardSummaryService,
  getDashboardChartsService,
  getRecentActivityService,
} from "./dashboard.service.js";

/**
 * ------------------------------------------------
 * Dashboard Summary
 * GET /api/dashboard/summary
 * ------------------------------------------------
 */
export const getDashboardSummary =
  asyncHandler(async (req, res) => {
    const summary =
      await getDashboardSummaryService();

    return res.status(200).json(
      new apiResponse(
        200,
        summary,
        "Dashboard summary fetched successfully"
      )
    );
  });

/**
 * ------------------------------------------------
 * Dashboard Charts
 * GET /api/dashboard/charts
 * ------------------------------------------------
 */
export const getDashboardCharts =
  asyncHandler(async (req, res) => {
    const charts =
      await getDashboardChartsService();

    return res.status(200).json(
      new apiResponse(
        200,
        charts,
        "Dashboard chart data fetched successfully"
      )
    );
  });

/**
 * ------------------------------------------------
 * Recent Activity
 * GET /api/dashboard/recent-activity
 * ------------------------------------------------
 */
export const getRecentActivity =
  asyncHandler(async (req, res) => {
    const activity =
      await getRecentActivityService();

    return res.status(200).json(
      new apiResponse(
        200,
        activity,
        "Recent activity fetched successfully"
      )
    );
  });