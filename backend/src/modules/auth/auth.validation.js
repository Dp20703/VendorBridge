import { body, param } from "express-validator";

/* ─────────────────────────────────────────────
   REGISTER VALIDATION
───────────────────────────────────────────── */

export const registerValidation = [
  /* FIRST NAME */

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets allowed"),

  /* LAST NAME */

  body("lastName")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets allowed"),

  /* EMAIL */

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  /* PASSWORD */

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain number"),

  /* CONFIRM PASSWORD */

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  /* PHONE */

  body("phone")
    .optional({
      nullable: true,
      checkFalsy: true,
    })
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
];

/* ─────────────────────────────────────────────
   LOGIN VALIDATION
───────────────────────────────────────────── */

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

/* ─────────────────────────────────────────────
   FORGOT PASSWORD VALIDATION
───────────────────────────────────────────── */

export const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];
