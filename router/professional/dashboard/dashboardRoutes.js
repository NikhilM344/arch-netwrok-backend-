import { Router } from "express";
const router = Router();
import professionalDashboardInfo from "../../../controller/professional/dashboard/dashboard.js";
import { requireRole } from "../../../middleware/requireRoleMiddleware.js";

router.get("/dashboard/info",requireRole,professionalDashboardInfo);

export default router;