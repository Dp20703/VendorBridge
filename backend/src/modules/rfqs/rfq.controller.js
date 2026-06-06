import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createRfqService,
  getAllRfqsService,
  getRfqByIdService,
  updateRfqService,
  deleteRfqService,
} from "./rfq.service.js";

export const createRfq = asyncHandler(async (req, res) => {
  const rfq = await createRfqService({
    ...req.body,
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, rfq, "RFQ created successfully"));
});

export const getAllRfqs = asyncHandler(async (req, res) => {
  const rfqs = await getAllRfqsService();

  return res
    .status(200)
    .json(new apiResponse(200, rfqs, "RFQs fetched successfully"));
});

export const getRfqById = asyncHandler(async (req, res) => {
  const rfq = await getRfqByIdService(req.params.id);

  if (!rfq) {
    throw new apiError(404, "RFQ not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, rfq, "RFQ fetched successfully"));
});

export const updateRfq = asyncHandler(async (req, res) => {
  const rfq = await updateRfqService(req.params.id, req.body);

  if (!rfq) {
    throw new apiError(404, "RFQ not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, rfq, "RFQ updated successfully"));
});

export const deleteRfq = asyncHandler(async (req, res) => {
  const rfq = await deleteRfqService(req.params.id);

  if (!rfq) {
    throw new apiError(404, "RFQ not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "RFQ deleted successfully"));
});
