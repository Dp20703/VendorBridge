import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

import { getComparisonService } from "./comparison.service.js";

/**
 * GET /api/comparison/:rfqId
 */
export const getComparison = asyncHandler(async (req, res) => {
  const comparison = await getComparisonService(req.params.rfqId);

  return res
    .status(200)
    .json(
      new apiResponse(200, comparison, "Comparison generated successfully"),
    );
});
