import { Router } from "express";
const router = Router();
import { professionalDeleteAccount } from "../../../controller/professional/account/deleteaccount.js";
import { requireAuth } from "../../../middleware/requireauthmiddleware.js";

router.delete("/delete", requireAuth, professionalDeleteAccount);

export default router;
