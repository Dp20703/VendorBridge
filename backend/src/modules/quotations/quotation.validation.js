import { body } from "express-validator";

export const createQuotationValidation = [
  body("rfqId").notEmpty().withMessage("RFQ is required"),

  body("amount").isFloat({ min: 1 }).withMessage("Amount is required"),

  body("deliveryDays")
    .isInt({ min: 1 })
    .withMessage("Delivery days must be greater than 0"),

  body("notes").optional().trim(),
];

export const updateQuotationValidation = [
  body("amount").optional().isFloat({ min: 1 }),

  body("deliveryDays").optional().isInt({ min: 1 }),

  body("notes").optional().trim(),
];
