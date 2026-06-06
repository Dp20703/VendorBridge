import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema({
  rfqId: ObjectId,

  vendorId: ObjectId,

  amount: Number,

  deliveryDays: Number,

  notes: String,

  status: {
    type: String,
    enum: ["SUBMITTED", "SELECTED", "REJECTED"],
  },
});

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
