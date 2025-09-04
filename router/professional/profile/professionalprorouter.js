import { Router } from "express";
const router = Router();
import { fetchProfessionalProfileDetail } from "../../../controller/professional/profile/fetchproprofile.js";
import { getProfessionalProfileDetail } from "../../../controller/professional/profile/fetchprofdetails.js";
import { requireAuth } from "../../../middleware/requireauthmiddleware.js";
import upload from "../../../utility/vendorformdata.js";
import { updateProfessionalProfileDetail } from "../../../controller/professional/profile/updateprofprofiledetail.js";

router
  .get("/professionaldetails/:id", fetchProfessionalProfileDetail)
  .get("/professionaldetails", requireAuth, getProfessionalProfileDetail)
  .patch("/updateprofprofile",requireAuth,upload.single("representativePhoto"),updateProfessionalProfileDetail)

export default router;
