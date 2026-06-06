import Notification from "./notification.model.js";

/**
 * Get User Notifications
 */
export const getNotificationsService = async (userId) => {
  return await Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

/**
 * Mark Notification Read
 */
export const markNotificationReadService = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    {
      isRead: true,
    },
    {
      new: true,
    },
  );
};

/**
 * Mark All Notifications Read
 */
export const markAllNotificationsReadService = async (userId) => {
  return await Notification.updateMany(
    {
      userId,
      isRead: false,
    },
    {
      isRead: true,
    },
  );
};
