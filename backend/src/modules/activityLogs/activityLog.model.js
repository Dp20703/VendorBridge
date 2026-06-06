import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    /**
     * User Who Performed Action
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Module Name
     * Example:
     * RFQ
     * QUOTATION
     * APPROVAL
     */
    module: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Action Performed
     * Example:
     * CREATE_RFQ
     * SUBMIT_QUOTATION
     * APPROVE_QUOTATION
     */
    action: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Additional Data
     */
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
