import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "./notification.controller.js";

const router = express.Router();

/**
 * ------------------------------------------------
 * Get User Notifications
 * ------------------------------------------------
 */
router.get("/", verifyJWT, getNotifications);

/**
 * ------------------------------------------------
 * Mark Notification Read
 * ------------------------------------------------
 */
router.patch("/:id/read", verifyJWT, markNotificationRead);

/**
 * ------------------------------------------------
 * Mark All Notifications Read
 * ------------------------------------------------
 */
router.patch("/read-all", verifyJWT, markAllNotificationsRead);

export default router;
