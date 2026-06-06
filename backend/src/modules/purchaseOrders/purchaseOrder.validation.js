import { body } from "express-validator";

export const createPurchaseOrderValidation = [
  body("quotationId").notEmpty().withMessage("Quotation is required"),
];
