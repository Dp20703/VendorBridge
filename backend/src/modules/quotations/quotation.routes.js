import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
  createQuotation,
  updateQuotation,
  getAllQuotations,
  getQuotationsByRfq,
} from "./quotation.controller.js";
import {
  createQuotationValidation,
  updateQuotationValidation,
} from "./quotation.validation.js";

const router = express.Router();

/**
 * Submit Quotation
 * Vendor Only
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("VENDOR"),
  validate(createQuotationValidation),
  createQuotation,
);

/**
 * Update Quotation
 * Vendor Only
 */
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("VENDOR"),
  validate(updateQuotationValidation),
  updateQuotation,
);
/**
 * Procurement - Get All Quotations
 */
router.get(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getAllQuotations,
);

/**
 * Procurement - Get Quotations For RFQ
 */
router.get(
  "/rfqs/:rfqId",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getQuotationsByRfq,
);

/**
 * Vendor - Submit Quotation
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("VENDOR"),
  validate(createQuotationValidation),
  createQuotation,
);

/**
 * Vendor - Update Quotation
 */
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("VENDOR"),
  validate(updateQuotationValidation),
  updateQuotation,
);
export default router;
