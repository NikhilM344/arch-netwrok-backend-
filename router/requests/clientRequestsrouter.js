import { Router } from "express";
import clientRequestHandler from "../../controller/requests/clientRequestsController.js";
import { clientRequestList } from "../../controller/requests/clientRequestsListController.js";
import { requireRole } from "../../middleware/requireRoleMiddleware.js";
import { updateClientRequestStatus } from "../../controller/requests/updateRequestStatusController.js";
const router = Router();

router.post("/client", clientRequestHandler)
.get("/list",requireRole,clientRequestList)
.patch("/updatestatus/:id",requireRole,updateClientRequestStatus);
export default router;








