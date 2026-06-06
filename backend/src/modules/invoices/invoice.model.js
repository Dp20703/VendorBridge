import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    /**
     * Human Friendly Invoice Number
     */
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Purchase Order Reference
     */
    poId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
      unique: true,
    },

    /**
     * Financial Breakdown
     */
    subtotal: {
      type: Number,
      required: true,
    },

    taxAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    /**
     * PDF URL
     */
    pdfUrl: {
      type: String,
      default: "",
    },

    /**
     * Invoice Status
     */
    status: {
      type: String,
      enum: ["GENERATED", "PAID"],
      default: "GENERATED",
    },
  },
  {
    timestamps: true,
  },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
