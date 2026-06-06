import Quotation from "../quotations/quotation.model.js";
import apiError from "../../utils/apiError.js";

export const getComparisonService = async (rfqId) => {
  const quotations = await Quotation.find({
    rfqId,
  })
    .populate("vendorId", "companyName rating status")
    .sort({
      amount: 1,
    });

  if (!quotations.length) {
    throw new apiError(404, "No quotations found for this RFQ");
  }

  /**
   * Lowest Price Vendor
   */
  const lowestPriceVendor = quotations.reduce((lowest, current) =>
    current.amount < lowest.amount ? current : lowest,
  );

  /**
   * Fastest Delivery Vendor
   */
  const fastestVendor = quotations.reduce((fastest, current) =>
    current.deliveryDays < fastest.deliveryDays ? current : fastest,
  );

  /**
   * Recommended Vendor
   *
   * Simple Scoring Formula:
   * 70% Price
   * 30% Delivery
   */

  const maxAmount = Math.max(...quotations.map((q) => q.amount));

  const maxDelivery = Math.max(...quotations.map((q) => q.deliveryDays));

  let recommendedVendor = null;
  let highestScore = -1;

  quotations.forEach((quotation) => {
    const priceScore = (maxAmount - quotation.amount) / maxAmount;

    const deliveryScore = (maxDelivery - quotation.deliveryDays) / maxDelivery;

    const finalScore = priceScore * 0.7 + deliveryScore * 0.3;

    if (finalScore > highestScore) {
      highestScore = finalScore;
      recommendedVendor = quotation;
    }
  });

  return {
    quotations,

    lowestPriceVendor,

    fastestVendor,

    recommendedVendor,
  };
};
