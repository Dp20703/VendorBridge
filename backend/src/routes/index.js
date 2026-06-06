import express from "express";

import activityRoutes from "../modules/activityLogs/activityLog.routes.js";
import approvalRoutes from "../modules/approvals/approval.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import comparisonRoutes from "../modules/comparison/comparison.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import invoiceRoutes from "../modules/invoices/invoice.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";
import purchaseOrderRoutes from "../modules/purchaseOrders/purchaseOrder.routes.js";
import quotationRoutes from "../modules/quotations/quotation.routes.js";
import reportRoutes from "../modules/reports/reports.routes.js";
import rfqRoutes from "../modules/rfqs/rfq.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import vendorRoutes from "../modules/vendors/vendor.routes.js";

const router = express.Router();

router.use("/activity", activityRoutes);
router.use("/approvals", approvalRoutes);
router.use("/auth", authRoutes);
router.use("/comparison", comparisonRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/notifications", notificationRoutes);
router.use("/purchase-orders", purchaseOrderRoutes);
router.use("/quotations", quotationRoutes);
router.use("/reports", reportRoutes);
router.use("/rfqs", rfqRoutes);
router.use("/users", userRoutes);
router.use("/vendors", vendorRoutes);

export default router;
