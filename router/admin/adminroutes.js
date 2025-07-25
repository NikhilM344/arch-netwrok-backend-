import { Router } from "express";
const router = Router();
import { countDetail } from "../../controller/admin/countsdetail.js";
import { adminLogin } from "../../controller/admin/adminlogin.js";

router.get('/details',countDetail)
.post('/login',adminLogin)
export default router
