import { body } from "express-validator";

export const createRfqValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  body("deadline").isISO8601().withMessage("Valid deadline is required"),

  body("vendors").optional().isArray().withMessage("Vendors must be an array"),
];

export const updateRfqValidation = [
  body("title").optional().trim(),

  body("description").optional().trim(),

  body("quantity").optional().isInt({ min: 1 }),

  body("deadline").optional().isISO8601(),

  body("vendors").optional().isArray(),

  body("status").optional().isIn(["DRAFT", "OPEN", "CLOSED", "APPROVED"]),
];
