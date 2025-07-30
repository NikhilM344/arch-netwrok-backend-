import { Router } from "express";
const router = Router();
import { fetchProfessionalDetailsInDetailedForAdmin,fetchProfessionalDetailForAdmin } from "../../../controller/admin/professional/professionaldetail.js";

router.get('/prof/indetails/:professionalId', fetchProfessionalDetailsInDetailedForAdmin)
.get('/prof/details',fetchProfessionalDetailForAdmin);

export default router
