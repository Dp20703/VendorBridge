import Vendor from "../vendors/vendor.model.js";

import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createQuotationService,
  getQuotationByIdService,
  updateQuotationService,
  getAllQuotationsService,
  getQuotationsByRfqService,
} from "./quotation.service.js";

import Quotation from "./quotation.model.js";

/**
 * Create Quotation
 * Vendor Only
 */
export const createQuotation = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({
    createdBy: req.user._id,
  });

  if (!vendor) {
    throw new apiError(404, "Vendor profile not found");
  }

  const existingQuotation = await Quotation.findOne({
    rfqId: req.body.rfqId,
    vendorId: vendor._id,
  });

  if (existingQuotation) {
    throw new apiError(400, "Quotation already submitted");
  }

  const quotation = await createQuotationService({
    ...req.body,
    vendorId: vendor._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, quotation, "Quotation submitted successfully"));
});

/**
 * Update Quotation
 * Vendor Only
 */
export const updateQuotation = asyncHandler(async (req, res) => {
  const quotation = await getQuotationByIdService(req.params.id);

  if (!quotation) {
    throw new apiError(404, "Quotation not found");
  }

  const vendor = await Vendor.findOne({
    createdBy: req.user._id,
  });

  if (quotation.vendorId._id.toString() !== vendor._id.toString()) {
    throw new apiError(403, "Unauthorized access");
  }

  if (quotation.status !== "SUBMITTED") {
    throw new apiError(400, "Cannot modify processed quotation");
  }

  const updatedQuotation = await updateQuotationService(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedQuotation, "Quotation updated successfully"),
    );
});

/**
 * Get All Quotations
 * Procurement/Admin/Manager
 */
export const getAllQuotations = asyncHandler(async (req, res) => {
  const quotations = await getAllQuotationsService();

  return res
    .status(200)
    .json(new apiResponse(200, quotations, "Quotations fetched successfully"));
});

/**
 * Get Quotations For RFQ
 * Procurement/Admin/Manager
 */
export const getQuotationsByRfq = asyncHandler(async (req, res) => {
  const quotations = await getQuotationsByRfqService(req.params.rfqId);

  return res
    .status(200)
    .json(
      new apiResponse(200, quotations, "RFQ quotations fetched successfully"),
    );
});
