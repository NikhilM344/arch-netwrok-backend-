import { Router } from "express";
const router = Router();
import upload from "../../../utility/vendorformdata.js";
import { createProfessionalProject } from "../../../controller/professional/project/createproject.js";
import { requireRole } from "../../../middleware/requireRoleMiddleware.js";
import fetchProfessionalProjects from "../../../controller/professional/project/fetchprojects.js";

router.post(
  "/createproject",
  requireRole,
  upload.fields([
    { name: "projectImage", maxCount: 5 },
    { name: "projectExecutionImg", maxCount: 5 },
    { name: "projectTechDocImg", maxCount: 5 },
    { name: "presentaionBoardImg", maxCount: 5 }
  ]),
  createProfessionalProject
).get("/fetchprojects",requireRole,fetchProfessionalProjects);

export default router;
