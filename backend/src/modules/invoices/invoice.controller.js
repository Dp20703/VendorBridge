import Invoice from "./invoice.model.js";
import PurchaseOrder from "../purchaseOrders/purchaseOrder.model.js";
import sendInvoiceEmail from "../../utils/sendInvoiceEmail.js";
import { createNotification } from "../notifications/notification.utils.js";

import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
} from "./invoice.service.js";

/**
 * ------------------------------------------------
 * Create Invoice
 * POST /api/invoices
 * ------------------------------------------------
 */
export const createInvoice = asyncHandler(async (req, res) => {
  const { poId } = req.body;

  const purchaseOrder = await PurchaseOrder.findById(poId);

  if (!purchaseOrder) {
    throw new apiError(404, "Purchase order not found");
  }

  const existingInvoice = await Invoice.findOne({
    poId,
  });

  if (existingInvoice) {
    throw new apiError(400, "Invoice already exists for this PO");
  }

  const subtotal = purchaseOrder.amount;

  const taxPercentage = Number(req.body.taxPercentage || 18);

  const taxAmount = (subtotal * taxPercentage) / 100;

  const totalAmount = subtotal + taxAmount;

  const invoice = await createInvoiceService({
    invoiceNumber: `INV-${Date.now()}`,
    poId,
    subtotal,
    taxAmount,
    totalAmount,
    pdfUrl: "",
    status: "GENERATED",
  });
  await createNotification({
    userId: req.user._id,
    title: "Invoice Generated",
    message: `Invoice ${invoice.invoiceNumber} has been generated`,
    type: "INVOICE",
  });
  return res
    .status(201)
    .json(new apiResponse(201, invoice, "Invoice generated successfully"));
});

/**
 * ------------------------------------------------
 * Get All Invoices
 * GET /api/invoices
 * ------------------------------------------------
 */
export const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await getAllInvoicesService();

  return res
    .status(200)
    .json(new apiResponse(200, invoices, "Invoices fetched successfully"));
});

/**
 * ------------------------------------------------
 * Get Invoice By Id
 * GET /api/invoices/:id
 * ------------------------------------------------
 */
export const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await getInvoiceByIdService(req.params.id);

  if (!invoice) {
    throw new apiError(404, "Invoice not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, invoice, "Invoice fetched successfully"));
});

/**
 * ------------------------------------------------
 * Download Invoice PDF
 * GET /api/invoices/:id/pdf
 * ------------------------------------------------
 */
export const getInvoicePdf = asyncHandler(async (req, res) => {
  const invoice = await getInvoiceByIdService(req.params.id);

  if (!invoice) {
    throw new apiError(404, "Invoice not found");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        pdfUrl: invoice.pdfUrl || "PDF generation pending",
      },
      "Invoice PDF fetched successfully",
    ),
  );
});

/**
 * ------------------------------------------------
 * Email Invoice To Vendor
 * POST /api/invoices/:id/email
 * ------------------------------------------------
 */
export const emailInvoice = asyncHandler(async (req, res) => {
  const invoice = await getInvoiceByIdService(req.params.id);

  if (!invoice) {
    throw new apiError(404, "Invoice not found");
  }

  /**
   * Get Purchase Order
   */
  const purchaseOrder = await PurchaseOrder.findById(invoice.poId);

  if (!purchaseOrder) {
    throw new apiError(404, "Purchase order not found");
  }

  /**
   * Get Vendor
   */
  const vendor = await Vendor.findById(purchaseOrder.vendorId).populate(
    "createdBy",
    "email fullName",
  );

  if (!vendor) {
    throw new apiError(404, "Vendor not found");
  }

  const vendorEmail = vendor.createdBy.email;

  await sendInvoiceEmail({
    to: vendorEmail,
    invoiceNumber: invoice.invoiceNumber,
    totalAmount: invoice.totalAmount,
    pdfUrl: invoice.pdfUrl,
  });

  return res
    .status(200)
    .json(new apiResponse(200, null, "Invoice email sent successfully"));
});
