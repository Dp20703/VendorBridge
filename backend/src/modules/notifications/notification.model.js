import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    /**
     * Notification Recipient
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Notification Title
     */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Notification Message
     */
    message: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Type
     */
    type: {
      type: String,
      enum: [
        "RFQ",
        "QUOTATION",
        "APPROVAL",
        "PURCHASE_ORDER",
        "INVOICE",
        "SYSTEM",
      ],
      default: "SYSTEM",
    },

    /**
     * Read Status
     */
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
