import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  userId: ObjectId,

  module: String,

  action: String,

  metadata: Object,
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
