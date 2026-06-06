import Invoice from "./invoice.model.js";

/**
 * Create Invoice
 */
export const createInvoiceService = async (payload) => {
  return await Invoice.create(payload);
};

/**
 * Get All Invoices
 */
export const getAllInvoicesService = async () => {
  return await Invoice.find().populate("poId").sort({
    createdAt: -1,
  });
};

/**
 * Get Invoice By Id
 */
export const getInvoiceByIdService = async (invoiceId) => {
  return await Invoice.findById(invoiceId).populate("poId");
};
