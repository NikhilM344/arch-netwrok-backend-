import { Router } from "express";
import { createReview } from "../../../controller/user/reviewandrating/clientreviewandrating.js";
import { getProfessionalReviews } from "../../../controller/user/reviewandrating/clientreviewandrating.js";
import { requireRole } from "../../../middleware/requireRoleMiddleware.js";
const router = Router();

router.post("/createreview",createReview)
.get("/getprofessionalreviews",requireRole,getProfessionalReviews);

export default router;
