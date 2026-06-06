import Approval from "./approval.model.js";

export const createApprovalService = async (payload) => {
  return await Approval.create(payload);
};

export const getApprovalByIdService = async (approvalId) => {
  return await Approval.findById(approvalId)
    .populate("rfqId", "title status")
    .populate("quotationId")
    .populate("approverId", "fullName email role");
};

export const updateApprovalService = async (approvalId, payload) => {
  return await Approval.findByIdAndUpdate(approvalId, payload, {
    new: true,
    runValidators: true,
  })
    .populate("rfqId", "title status")
    .populate("quotationId")
    .populate("approverId", "fullName email role");
};
