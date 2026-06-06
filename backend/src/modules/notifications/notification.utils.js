import Notification from "./notification.model.js";

export const createNotification = async ({
  userId,
  title,
  message,
  type = "SYSTEM",
}) => {
  return await Notification.create({
    userId,
    title,
    message,
    type,
  });
};
