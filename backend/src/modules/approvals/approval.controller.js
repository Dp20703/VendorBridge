import Approval from "./approval.model.js";
import Quotation from "../quotation/quotation.model.js";

import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createApprovalService,
  getApprovalByIdService,
  updateApprovalService,
} from "./approval.service.js";

/**
 * Create Approval Request
 * Procurement/Admin
 */
export const createApproval = asyncHandler(async (req, res) => {
  const existingApproval = await Approval.findOne({
    quotationId: req.body.quotationId,
  });

  if (existingApproval) {
    throw new apiError(400, "Approval already exists");
  }

  const approval = await createApprovalService({
    ...req.body,
    approverId: req.user._id,
  });

  return res
    .status(201)
    .json(
      new apiResponse(201, approval, "Approval request created successfully"),
    );
});

/**
 * Approve / Reject
 * Manager/Admin
 */
export const updateApproval = asyncHandler(async (req, res) => {
  const approval = await getApprovalByIdService(req.params.id);

  if (!approval) {
    throw new apiError(404, "Approval not found");
  }

  const updatedApproval = await updateApprovalService(req.params.id, {
    status: req.body.status,
    remarks: req.body.remarks,
  });

  /**
   * Update quotation status
   */
  if (req.body.status === "APPROVED") {
    await Quotation.findByIdAndUpdate(approval.quotationId._id, {
      status: "SELECTED",
    });
  }

  if (req.body.status === "REJECTED") {
    await Quotation.findByIdAndUpdate(approval.quotationId._id, {
      status: "REJECTED",
    });
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedApproval, "Approval updated successfully"),
    );
});
