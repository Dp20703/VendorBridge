import Approval from "../approval/approval.model.js";
import Quotation from "../quotation/quotation.model.js";

import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createPurchaseOrderService,
  getAllPurchaseOrdersService,
  getPurchaseOrderByIdService,
} from "./purchaseOrder.service.js";

/**
 * Generate PO
 */
export const createPurchaseOrder = asyncHandler(async (req, res) => {
  const { quotationId } = req.body;

  const quotation = await Quotation.findById(quotationId);

  if (!quotation) {
    throw new apiError(404, "Quotation not found");
  }

  const approval = await Approval.findOne({
    quotationId,
    status: "APPROVED",
  });

  if (!approval) {
    throw new apiError(400, "Quotation has not been approved");
  }

  const poNumber = `PO-${Date.now()}`;

  const purchaseOrder = await createPurchaseOrderService({
    rfqId: quotation.rfqId,
    quotationId: quotation._id,
    vendorId: quotation.vendorId,
    amount: quotation.amount,
    poNumber,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        purchaseOrder,
        "Purchase order created successfully",
      ),
    );
});

/**
 * Get All POs
 */
export const getAllPurchaseOrders = asyncHandler(async (req, res) => {
  const purchaseOrders = await getAllPurchaseOrdersService();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        purchaseOrders,
        "Purchase orders fetched successfully",
      ),
    );
});

/**
 * Get PO By Id
 */
export const getPurchaseOrderById = asyncHandler(async (req, res) => {
  const purchaseOrder = await getPurchaseOrderByIdService(req.params.id);

  if (!purchaseOrder) {
    throw new apiError(404, "Purchase order not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        purchaseOrder,
        "Purchase order fetched successfully",
      ),
    );
});
