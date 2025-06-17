import { Router } from "express";
import clientRequestHandler from "../../controller/requests/clientRequestsController.js";
const router = Router();

router.post("/client", clientRequestHandler);

export default router;








