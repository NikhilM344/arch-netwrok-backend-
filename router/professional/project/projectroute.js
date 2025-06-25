import { Router } from "express";
const router = Router();
import upload from "../../../utility/vendorformdata.js";
import { createProfessionalProject } from "../../../controller/professional/project/createproject.js";
import { requireRole } from "../../../middleware/requireRoleMiddleware.js";

router.post(
  "/createproject",
  requireRole,
  upload.fields([
    { name: "projectImage", maxCount: 1 },
    { name: "projectExecutionImg", maxCount: 1 },
    { name: "projectTechDocImg", maxCount: 1 },
    { name: "presentaionBoardImg", maxCount: 1 }
  ]),
  createProfessionalProject
);

export default router;
