import express from "express";
import upload from "../../utility/vendorformdata.js";
import { createBusinessProfile } from "../../controller/auth/professionalsignupauth.js";

const router = express.Router();

// Vendor business profile registration route
router.post(
  "/professional/newregister",
  upload.fields([
    { name: "companyRegistrationDoc", maxCount: 1 },
    { name: "coaRegistrationDoc", maxCount: 1 },
    { name: "structuralRegistrationDoc", maxCount: 1 },
    { name: "constructionLicenseDoc", maxCount: 1 },
    { name: "gstDocument", maxCount: 1 },
    { name: "businessPanCard", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "kycIdDocument", maxCount: 1 },
    { name: "styleGuideFile", maxCount: 1 },
    // ✅ Extra fields jo aap bhej rahe ho
    { name: "representativePhoto", maxCount: 1 },
    { name: "projects[image]", maxCount: 1 },
 // ek hi image
    { name: "teamMembers[0][photo]", maxCount: 1 },
  ]),
  createBusinessProfile
);

export default router;
