import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
  getActivityLogs,
  getUserActivityLogs,
} from "./activityLog.controller.js";

const router = express.Router();

/**
 * ------------------------------------------------
 * Get All Activity Logs
 * ------------------------------------------------
 */
router.get("/", verifyJWT, authorizeRoles("ADMIN", "MANAGER"), getActivityLogs);

/**
 * ------------------------------------------------
 * Get User Activity Logs
 * ------------------------------------------------
 */
router.get(
  "/user/:userId",
  verifyJWT,
  authorizeRoles("ADMIN", "MANAGER"),
  getUserActivityLogs,
);

export default router;
