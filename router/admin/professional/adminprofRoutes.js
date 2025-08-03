import { Router } from "express";
const router = Router();
import { fetchProfessionalDetailsInDetailedForAdmin,fetchProfessionalDetailForAdmin } from "../../../controller/admin/professional/professionaldetail.js";
import { professionalVerificationByAdmin } from "../../../controller/admin/professional/professionalverification.js";

router.get('/prof/indetails/:professionalId', fetchProfessionalDetailsInDetailedForAdmin)
.get('/prof/details',fetchProfessionalDetailForAdmin)
.post("/prof/updatestatus/:id",professionalVerificationByAdmin)

export default router
