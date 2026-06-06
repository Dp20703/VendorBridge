import { body } from "express-validator";

export const createApprovalValidation = [
  body("rfqId").notEmpty().withMessage("RFQ is required"),

  body("quotationId").notEmpty().withMessage("Quotation is required"),

  body("remarks").optional().trim(),
];

export const updateApprovalValidation = [
  body("status").isIn(["APPROVED", "REJECTED"]).withMessage("Invalid status"),

  body("remarks").optional().trim(),
];
