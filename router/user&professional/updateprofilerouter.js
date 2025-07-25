import { Router } from "express";
import { updateProfile } from "../../controller/user&professional/updateprofile.js";
import { requireAuth } from "../../middleware/requireauthmiddleware.js";
const router = Router();

router.patch("/user/updateprofile",requireAuth,updateProfile)
export default router;