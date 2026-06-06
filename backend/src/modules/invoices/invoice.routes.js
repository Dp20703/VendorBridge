import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { createInvoiceValidation } from "./invoice.validation.js";

import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoicePdf,
  emailInvoice,
} from "./invoice.controller.js";

const router = express.Router();

/**
 * ------------------------------------------------
 * Create Invoice
 * ADMIN / PROCUREMENT
 * ------------------------------------------------
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  validate(createInvoiceValidation),
  createInvoice,
);

/**
 * ------------------------------------------------
 * Get All Invoices
 * ------------------------------------------------
 */
router.get(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getAllInvoices,
);

/**
 * ------------------------------------------------
 * Get Invoice By Id
 * ------------------------------------------------
 */
router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getInvoiceById,
);

/**
 * ------------------------------------------------
 * Get Invoice PDF
 * ------------------------------------------------
 */
router.get(
  "/:id/pdf",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getInvoicePdf,
);

/**
 * ------------------------------------------------
 * Email Invoice
 * ------------------------------------------------
 */
router.post(
  "/:id/email",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  emailInvoice,
);

export default router;
