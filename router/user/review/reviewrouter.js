import { Router } from "express";
import { createReview } from "../../../controller/user/reviewandrating/clientreviewandrating.js";
import { requireRoleClient } from "../../../middleware/requiredRoleclientMiddleware.js";
const router = Router();

router.post("/createreview",requireRoleClient,createReview);

export default router;
