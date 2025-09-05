import { Router } from "express";
import { userDashboardCountingAndDetails } from "../../../controller/user/dasboard/userdashboard.js";
import { requireRoleClient } from "../../../middleware/requiredRoleclientMiddleware.js";
const router = Router();

router.get("/getuserdashboarddetail",requireRoleClient,userDashboardCountingAndDetails)
export default router;
