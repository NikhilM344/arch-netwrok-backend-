import express from "express";
import upload from "../../utility/vendorformdata.js";
import { vendorRegistration } from "../../controller/auth/vendorsignupauth.js";

const router = express.Router();

router.post(
  "/vendor/register",
  upload.fields([
    { name: "licenseImage", maxCount: 1 },
    { name: "portfolioThumbnailImage", maxCount: 1 },
  ]),
 vendorRegistration
);

export default router;
