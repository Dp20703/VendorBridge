import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { createPurchaseOrderValidation } from "./purchaseOrder.validation.js";

import {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
} from "./purchaseOrder.controller.js";

const router = express.Router();

/**
 * Create Purchase Order
 * ADMIN / PROCUREMENT
 */
router.post(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT"),
  validate(createPurchaseOrderValidation),
  createPurchaseOrder,
);

/**
 * Get All Purchase Orders
 */
router.get(
  "/",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getAllPurchaseOrders,
);

/**
 * Get Purchase Order By Id
 */
router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("ADMIN", "PROCUREMENT", "MANAGER"),
  getPurchaseOrderById,
);

export default router;
