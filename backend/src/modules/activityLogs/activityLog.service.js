import ActivityLog from "./activityLog.model.js";

/**
 * Get All Activity Logs
 */
export const getActivityLogsService = async () => {
  return await ActivityLog.find()
    .populate("userId", "fullName email role")
    .sort({
      createdAt: -1,
    });
};

/**
 * Get User Activity Logs
 */
export const getUserActivityLogsService = async (userId) => {
  return await ActivityLog.find({
    userId,
  })
    .populate("userId", "fullName email role")
    .sort({
      createdAt: -1,
    });
};
