import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  getActivityLogsService,
  getUserActivityLogsService,
} from "./activityLog.service.js";

/**
 * ------------------------------------------------
 * Get All Activity Logs
 * GET /api/activity-logs
 * ------------------------------------------------
 */
export const getActivityLogs = asyncHandler(async (req, res) => {
  const logs = await getActivityLogsService();

  return res
    .status(200)
    .json(new apiResponse(200, logs, "Activity logs fetched successfully"));
});

/**
 * ------------------------------------------------
 * Get User Activity Logs
 * GET /api/activity-logs/user/:userId
 * ------------------------------------------------
 */
export const getUserActivityLogs = asyncHandler(async (req, res) => {
  const logs = await getUserActivityLogsService(req.params.userId);

  return res
    .status(200)
    .json(
      new apiResponse(200, logs, "User activity logs fetched successfully"),
    );
});
