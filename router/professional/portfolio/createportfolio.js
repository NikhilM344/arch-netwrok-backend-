import { Router } from "express";
const router = Router();
import upload from "../../../utility/vendorformdata.js";
import { createPortfolio } from "../../../controller/professional/portfolio/createportfolio.js";
import { requireRole } from "../../../middleware/requireRoleMiddleware.js";
import { fetchPortfolio } from "../../../controller/professional/portfolio/fetchportfolio.js";

router.post(
  "/createportfolio",
  requireRole,
  upload.fields([
    { name: "portfolioImage", maxCount: 1 }
  ]),
  createPortfolio
).get("/fetchportfolios",requireRole,fetchPortfolio)


export default router
