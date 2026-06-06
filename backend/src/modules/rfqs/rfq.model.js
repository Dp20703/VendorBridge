import mongoose from "mongoose";

const reqSchema = new mongoose.Schema({
  title: String,

  description: String,

  quantity: Number,

  deadline: Date,

  attachments: [String],
  vendors: [ObjectId],
  status: {
    type: String,
    enum: ["DRAFT", "OPEN", "CLOSED", "APPROVED"],
  },

  createdBy: ObjectId,
});

const Rfq = mongoose.model("Rfq", reqSchema);

export default Rfq;
