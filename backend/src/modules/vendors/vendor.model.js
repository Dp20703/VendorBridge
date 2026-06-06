import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  companyName: String,

  gstNumber: String,

  email: String,

  phone: String,

  category: String,

  address: String,

  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
  },

  rating: Number,

  createdBy: ObjectId,
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
