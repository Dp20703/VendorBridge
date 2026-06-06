import { body } from "express-validator";

export const updateProfileValidation = [
  body("firstName").optional().trim().isLength({ min: 2 }),

  body("lastName").optional().trim(),

  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/),
];

export const updateRoleValidation = [
  body("role")
    .isIn(["ADMIN", "PROCUREMENT", "MANAGER", "VENDOR"])
    .withMessage("Invalid role"),
];

export const updateStatusValidation = [
  body("isActive").isBoolean().withMessage("isActive must be boolean"),
];
