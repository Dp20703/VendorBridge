import Quotation from "./quotation.model.js";

export const createQuotationService = async (payload) => {
  return await Quotation.create(payload);
};

export const getQuotationByIdService = async (quotationId) => {
  return await Quotation.findById(quotationId)
    .populate("rfqId")
    .populate("vendorId", "companyName");
};

export const updateQuotationService = async (quotationId, payload) => {
  return await Quotation.findByIdAndUpdate(quotationId, payload, {
    new: true,
    runValidators: true,
  })
    .populate("rfqId")
    .populate("vendorId", "companyName");
};

/**
 * Get All Quotations
 */
export const getAllQuotationsService = async () => {
  return await Quotation.find()
    .populate("rfqId", "title quantity deadline status")
    .populate("vendorId", "companyName rating status")
    .sort({
      createdAt: -1,
    });
};

/**
 * Get Quotations By RFQ
 */
export const getQuotationsByRfqService = async (rfqId) => {
  return await Quotation.find({
    rfqId,
  })
    .populate("vendorId", "companyName rating status")
    .sort({
      amount: 1,
    });
};
