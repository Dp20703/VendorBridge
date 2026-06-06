import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
  {
    rfqId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rfq",
      required: true,
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true,
    },

    approverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

/**
 * One approval per quotation
 */
approvalSchema.index(
  {
    quotationId: 1,
  },
  {
    unique: true,
  },
);

const Approval = mongoose.model("Approval", approvalSchema);

export default Approval;
