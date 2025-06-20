import { Router } from "express";
import clientRequestHandler from "../../controller/requests/clientRequestsController.js";
import { clientRequestList } from "../../controller/requests/clientRequestsListController.js";
import { requireRole } from "../../middleware/requireRoleMiddleware.js";
const router = Router();

router.post("/client", clientRequestHandler)
router.get("/list",requireRole,clientRequestList);

export default router;








