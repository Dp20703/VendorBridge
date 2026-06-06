import PurchaseOrder from "./purchaseOrder.model.js";

export const createPurchaseOrderService = async (payload) => {
  return await PurchaseOrder.create(payload);
};

export const getAllPurchaseOrdersService = async () => {
  return await PurchaseOrder.find()
    .populate("rfqId", "title status")
    .populate("vendorId", "companyName")
    .populate("quotationId")
    .sort({
      createdAt: -1,
    });
};

export const getPurchaseOrderByIdService = async (id) => {
  return await PurchaseOrder.findById(id)
    .populate("rfqId", "title status")
    .populate("vendorId", "companyName")
    .populate("quotationId");
};
