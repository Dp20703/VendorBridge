import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "REJECTED", "INACTIVE"],
      default: "PENDING",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
