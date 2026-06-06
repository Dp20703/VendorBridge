import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
  rfqId: ObjectId,

  quotationId: ObjectId,

  approverId: ObjectId,

  remarks: String,

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
  },
});

const Approval = mongoose.model("Approval", approvalSchema);

export default Approval;
