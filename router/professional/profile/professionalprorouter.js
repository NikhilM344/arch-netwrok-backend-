import { Router } from "express";
const router = Router();
import { fetchProfessionalProfileDetail } from "../../../controller/professional/profile/fetchproprofile.js";
router.get(
  "/professionaldetails/:id",
  fetchProfessionalProfileDetail
)

export default router;
