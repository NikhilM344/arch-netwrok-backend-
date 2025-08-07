import { Router } from "express";
const router = Router();
import { fetchProfessionalDetailsInDetailedForAdmin,fetchProfessionalDetailForAdmin } from "../../../controller/admin/professional/professionaldetail.js";
import { professionalVerificationByAdmin } from "../../../controller/admin/professional/professionalverification.js";
import professionalProjectDetailProvideByAdmin from "../../../controller/admin/professional/professionalprojectdetail.js";
import { profProVeriforPublicationByAdmin } from "../../../controller/admin/professional/profprojectverification.js";

router.get('/prof/indetails/:professionalId', fetchProfessionalDetailsInDetailedForAdmin)
.get('/prof/details',fetchProfessionalDetailForAdmin)
.post("/prof/updatestatus/:id",professionalVerificationByAdmin)
.get("/prof/project/details/:professionalId",professionalProjectDetailProvideByAdmin)
.post("/prof/project/verification/:projectId",profProVeriforPublicationByAdmin)

export default router
