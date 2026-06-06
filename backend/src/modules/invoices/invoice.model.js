import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,

  poId: ObjectId,
  subtotal: Number,

  taxAmount: Number,

  totalAmount: Number,

  pdfUrl: String,

  status: {
    type: String,
    enum: ["GENERATED", "PAID"],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
