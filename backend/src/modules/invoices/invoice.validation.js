import { body } from "express-validator";

export const createInvoiceValidation = [
  body("poId").notEmpty().withMessage("Purchase Order is required"),

  body("taxPercentage").optional().isFloat({
    min: 0,
  }),
];
