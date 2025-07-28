import { Router } from "express";
const router = Router();
import { fetchClientDetailForAdmin } from "../../../controller/admin/client/clientdetail.js";

router.get('/clientDetails',fetchClientDetailForAdmin);

export default router
