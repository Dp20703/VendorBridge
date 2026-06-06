import Rfq from "./rfq.model.js";

export const createRfqService = async (payload) => {
  return await Rfq.create(payload);
};

export const getAllRfqsService = async () => {
  return await Rfq.find()
    .populate("createdBy", "fullName email role")
    .populate("vendors", "companyName status")
    .sort({
      createdAt: -1,
    });
};

export const getRfqByIdService = async (rfqId) => {
  return await Rfq.findById(rfqId)
    .populate("createdBy", "fullName email role")
    .populate("vendors", "companyName status");
};

export const updateRfqService = async (rfqId, payload) => {
  return await Rfq.findByIdAndUpdate(rfqId, payload, {
    new: true,
    runValidators: true,
  })
    .populate("createdBy", "fullName email role")
    .populate("vendors", "companyName status");
};

export const deleteRfqService = async (rfqId) => {
  return await Rfq.findByIdAndDelete(rfqId);
};
