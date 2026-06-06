import ActivityLog from "./activityLog.model.js";

export const createActivityLog = async ({
  userId,
  module,
  action,
  metadata = {},
}) => {
  return await ActivityLog.create({
    userId,
    module,
    action,
    metadata,
  });
};
