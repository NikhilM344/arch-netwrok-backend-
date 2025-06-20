import { Router } from "express";
import { fetchUserProfessionlProfile } from "../../controller/profile/userProfile.js";
import { requireAuth } from "../../middleware/requireauthmiddleware.js";
const router = Router();

router.get('/profile',requireAuth,fetchUserProfessionlProfile);

export default router;