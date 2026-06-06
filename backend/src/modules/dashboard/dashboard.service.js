import Vendor from "../vendor/vendor.model.js";
import Rfq from "../rfq/rfq.model.js";
import Quotation from "../quotation/quotation.model.js";
import PurchaseOrder from "../purchase-order/purchaseOrder.model.js";
import Invoice from "../invoice/invoice.model.js";

export const getDashboardSummaryService = async () => {
  const [
    totalVendors,
    totalRfqs,
    totalQuotations,
    totalPurchaseOrders,
    totalInvoices,
  ] = await Promise.all([
    Vendor.countDocuments(),
    Rfq.countDocuments(),
    Quotation.countDocuments(),
    PurchaseOrder.countDocuments(),
    Invoice.countDocuments(),
  ]);

  return {
    totalVendors,
    totalRfqs,
    totalQuotations,
    totalPurchaseOrders,
    totalInvoices,
  };
};

export const getDashboardChartsService = async () => {
  const [rfqCount, quotationCount, poCount, invoiceCount] = await Promise.all([
    Rfq.countDocuments(),
    Quotation.countDocuments(),
    PurchaseOrder.countDocuments(),
    Invoice.countDocuments(),
  ]);

  return {
    rfqCount,
    quotationCount,
    poCount,
    invoiceCount,
  };
};

export const getRecentActivityService = async () => {
  const [recentRfqs, recentQuotations, recentPurchaseOrders, recentInvoices] =
    await Promise.all([
      Rfq.find().sort({ createdAt: -1 }).limit(5),

      Quotation.find().sort({ createdAt: -1 }).limit(5),

      PurchaseOrder.find().sort({ createdAt: -1 }).limit(5),

      Invoice.find().sort({ createdAt: -1 }).limit(5),
    ]);

  return {
    recentRfqs,
    recentQuotations,
    recentPurchaseOrders,
    recentInvoices,
  };
};
