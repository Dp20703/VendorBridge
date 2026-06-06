import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    rfqId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rfq",
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    deliveryDays: {
      type: Number,
      required: true,
      min: 1,
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["SUBMITTED", "SELECTED", "REJECTED"],
      default: "SUBMITTED",
    },
  },
  {
    timestamps: true,
  },
);

/**
 * One quotation per vendor per RFQ
 */
quotationSchema.index(
  {
    rfqId: 1,
    vendorId: 1,
  },
  {
    unique: true,
  },
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
