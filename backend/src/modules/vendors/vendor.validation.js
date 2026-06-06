import { body } from "express-validator";

export const createVendorValidation = [
  body("companyName").trim().notEmpty().withMessage("Company name is required"),

  body("gstNumber").optional().trim(),

  body("country").optional().trim(),

  body("category").optional().trim(),

  body("address").optional().trim(),
];

export const updateVendorValidation = [
  body("companyName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company name cannot be empty"),

  body("gstNumber").optional().trim(),

  body("country").optional().trim(),

  body("category").optional().trim(),

  body("address").optional().trim(),

  body("status")
    .optional()
    .isIn(["PENDING", "ACTIVE", "REJECTED", "INACTIVE"])
    .withMessage("Invalid status"),

  body("rating")
    .optional()
    .isFloat({
      min: 0,
      max: 5,
    })
    .withMessage("Rating must be between 0 and 5"),
];
