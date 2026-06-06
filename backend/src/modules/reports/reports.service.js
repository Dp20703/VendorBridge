import Quotation from "../quotation/quotation.model.js";
import PurchaseOrder from "../purchase-order/purchaseOrder.model.js";
import Vendor from "../vendor/vendor.model.js";
import Rfq from "../rfq/rfq.model.js";

/**
 * ------------------------------------------------
 * Vendor Performance Report
 * ------------------------------------------------
 */
export const getVendorPerformanceReportService = async () => {
  const vendors = await Vendor.find();

  const report = await Promise.all(
    vendors.map(async (vendor) => {
      const quotations = await Quotation.countDocuments({
        vendorId: vendor._id,
      });

      const selectedQuotes = await Quotation.countDocuments({
        vendorId: vendor._id,
        status: "SELECTED",
      });

      return {
        vendorId: vendor._id,
        companyName: vendor.companyName,
        rating: vendor.rating,
        quotationsSubmitted: quotations,
        quotationsSelected: selectedQuotes,
        successRate:
          quotations > 0 ? ((selectedQuotes / quotations) * 100).toFixed(2) : 0,
      };
    }),
  );

  return report;
};

/**
 * ------------------------------------------------
 * Monthly Spending Report
 * ------------------------------------------------
 */
export const getMonthlySpendingReportService = async () => {
  return await PurchaseOrder.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },

        totalSpend: {
          $sum: "$amount",
        },

        purchaseOrders: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

/**
 * ------------------------------------------------
 * Procurement Trends Report
 * ------------------------------------------------
 */
export const getProcurementTrendsReportService = async () => {
  const [totalRfqs, totalQuotations, totalPurchaseOrders, totalVendors] =
    await Promise.all([
      Rfq.countDocuments(),
      Quotation.countDocuments(),
      PurchaseOrder.countDocuments(),
      Vendor.countDocuments(),
    ]);

  /**
   * RFQ -> PO Conversion Rate
   */
  const conversionRate =
    totalRfqs > 0 ? ((totalPurchaseOrders / totalRfqs) * 100).toFixed(2) : 0;

  /**
   * Average Quotation Value
   */
  const quotationStats = await Quotation.aggregate([
    {
      $group: {
        _id: null,
        averageQuotationValue: {
          $avg: "$amount",
        },
      },
    },
  ]);

  const averageQuotationValue = quotationStats[0]?.averageQuotationValue || 0;

  /**
   * Average Vendor Rating
   */
  const vendorStats = await Vendor.aggregate([
    {
      $group: {
        _id: null,
        averageVendorRating: {
          $avg: "$rating",
        },
      },
    },
  ]);

  const averageVendorRating = vendorStats[0]?.averageVendorRating || 0;

  /**
   * Top Vendor
   */
  const vendorPerformance = await Quotation.aggregate([
    {
      $match: {
        status: "SELECTED",
      },
    },

    {
      $group: {
        _id: "$vendorId",
        selectedCount: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        selectedCount: -1,
      },
    },

    {
      $limit: 1,
    },
  ]);

  let topVendor = null;

  if (vendorPerformance.length) {
    topVendor = await Vendor.findById(vendorPerformance[0]._id).select(
      "companyName rating",
    );
  }

  /**
   * Monthly Growth
   *
   * Current Month PO Count
   * vs Previous Month PO Count
   */

  const now = new Date();

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const [currentMonthPOs, previousMonthPOs] = await Promise.all([
    PurchaseOrder.countDocuments({
      createdAt: {
        $gte: currentMonthStart,
      },
    }),

    PurchaseOrder.countDocuments({
      createdAt: {
        $gte: previousMonthStart,
        $lte: previousMonthEnd,
      },
    }),
  ]);

  let monthlyGrowth = 0;

  if (previousMonthPOs > 0) {
    monthlyGrowth = (
      ((currentMonthPOs - previousMonthPOs) / previousMonthPOs) *
      100
    ).toFixed(2);
  }

  return {
    totalRfqs,
    totalQuotations,
    totalPurchaseOrders,
    totalVendors,

    conversionRate,

    averageQuotationValue: Number(averageQuotationValue.toFixed(2)),

    averageVendorRating: Number(averageVendorRating.toFixed(2)),

    topVendor,

    monthlyGrowth: Number(monthlyGrowth),
  };
};
