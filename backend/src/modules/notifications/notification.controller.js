import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  getNotificationsService,
  markNotificationReadService,
  markAllNotificationsReadService,
} from "./notification.service.js";

/**
 * ------------------------------------------------
 * Get Notifications
 * GET /api/notifications
 * ------------------------------------------------
 */
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await getNotificationsService(req.user._id);

  return res
    .status(200)
    .json(
      new apiResponse(200, notifications, "Notifications fetched successfully"),
    );
});

/**
 * ------------------------------------------------
 * Mark Notification Read
 * PATCH /api/notifications/:id/read
 * ------------------------------------------------
 */
export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await markNotificationReadService(req.params.id);

  if (!notification) {
    throw new apiError(404, "Notification not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, notification, "Notification marked as read"));
});

/**
 * ------------------------------------------------
 * Mark All Notifications Read
 * PATCH /api/notifications/read-all
 * ------------------------------------------------
 */
export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await markAllNotificationsReadService(req.user._id);

  return res
    .status(200)
    .json(new apiResponse(200, null, "All notifications marked as read"));
});
