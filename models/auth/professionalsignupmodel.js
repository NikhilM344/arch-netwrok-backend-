import mongoose from "mongoose";
import { Schema } from "mongoose";

// validators
const PINCODE_REGEX = /^[1-9][0-9]{5}$/; // India pincode
const URL_REGEX =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:?#\[\]@!$&'()*+,;=]*)?$/i;
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const OperatingAreaSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    category: { type: String, trim: true, maxlength: 80 },
    location: { type: String, trim: true, maxlength: 120 },
    startDate: Date,
    endDate: Date,
    budgetRange: { type: String, trim: true, maxlength: 80 },
    image: { type: String, default: "" }, // 👈 ek hi image
    videoUrls: { type: String, default: "" },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: false, trim: true, maxlength: 80 },
    role: { type: String, required: false, trim: true, maxlength: 80 },
    experienceYears: { type: Number, min: 0, max: 80 },
    // photo: { type: String, required: false, default: "" },
    // certifications: { type: [String], default: [] },
  },
  { _id: false }
);

const CapacitySchema = new Schema(
  {
    teamSize: { type: Number, min: 0, max: 10000 },
    concurrentProjects: { type: Number, min: 0, max: 1000 },
  },
  { _id: false }
);

const BusinessProfileSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 140,
    },
    businessType: {
      type: String,
      required: true,
      enum: ["Individual", "Partnership/LLP", "PrivateLimited/Company"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "ArchitectureConsultant",
        "InteriorDesigner",
        "StructuralConsultant",
        "MEPConsultant",
        "Contractor",
      ],
    },
    companyRegistrationDoc: { type: String },
    coaRegistrationDoc: { type: String },
    structuralRegistrationDoc: { type: String },
    constructionLicenseDoc: { type: String },
    dateOfEstablishment: { type: Date, required: true },
    websiteUrl: {
      type: String,
      trim: true,
      validate: { validator: (v) => !v || URL_REGEX.test(v) },
    },

    registeredAddress: {
      line1: { type: String, required: false, trim: true, maxlength: 180 },
      line2: { type: String, trim: true, maxlength: 180 },
    },
    state: { type: String, required: true, trim: true, maxlength: 80 },
    district: { type: String, required: true, trim: true, maxlength: 80 },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    pincode: {
      type: String,
      required: true,
      validate: { validator: (v) => PINCODE_REGEX.test(v) },
    },
    operatingAreas: { type: [OperatingAreaSchema], default: [] },
    companyEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: { validator: (v) => EMAIL_REGEX.test(v) },
    },
    companyPhone: {
      type: String,
      required: true,
      validate: { validator: (v) => PHONE_REGEX.test(v) },
    },
    whatsappNumber: {
      type: String,
      validate: { validator: (v) => !v || PHONE_REGEX.test(v) },
    },

    representativeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    designation: {
      type: String,
      required: true,
      enum: ["Founder", "Partner", "Director", "Manager"],
    },
    representativeMobile: {
      type: String,
      required: true,
      validate: { validator: (v) => PHONE_REGEX.test(v) },
    },
    isMobileVerified: { type: Boolean, default: false },
    representativeEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: { validator: (v) => EMAIL_REGEX.test(v) },
    },
    representativePhoto: { type: String, required: false },

    gstNumber: { type: String, trim: true, maxlength: 20 },
    gstDocument: { type: String },
    kycIdType: {
      type: String,
      required: true,
      enum: ["Aadhaar", "PAN", "VoterID", "Passport"],
    },
    kycIdDocument: { type: String, required: true },
    businessPanCard: { type: String },

    logo: { type: String, required: true },
    tagline: { type: String, trim: true, maxlength: 160 },
    brandColors: { type: [String], default: [] },
    styleGuideFile: { type: String, required: false },

    shortDescription: { type: String, required: true, trim: true },
    detailedDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 9000,
    },

    projects: { type: ProjectSchema, default: {} },
    teamMembers: { type: [TeamMemberSchema], default: [] },
    capacity: { type: CapacitySchema },

    services: { type: [String], required: true },
    customServices: { type: [String], default: [] },

    declarationAccepted: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ["user", "professional", "admin"],
      default: "professional",
    },
    password: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    totalReview: {
      type: Number,
      default: 0,
    },
    isVerifiedByAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    isVerificationRejectionReason: {
      type: String,
      default: "",
      required: false,
    },
    isPhoneVerifed: {
      type: Boolean,
      default: false,
      required: false,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
    },
    emailVerificationId: {
      type: String,
      required: false,
    },
    isEmailVerfication: {
      type: Boolean,
      required: false,
      default: false,
    },
    isProjectCount: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  { timestamps: true }
);

BusinessProfileSchema.pre("validate", function (next) {
  const doc = this;
  if (
    (doc.businessType === "Partnership/LLP" ||
      doc.businessType === "PrivateLimited/Company") &&
    !doc.companyRegistrationDoc
  ) {
    return next(
      new Error(
        "companyRegistrationDoc is required for Partnership/LLP or PrivateLimited/Company"
      )
    );
  }
  if (doc.category === "ArchitectureConsultant" && !doc.coaRegistrationDoc) {
    return next(
      new Error("coaRegistrationDoc is required for ArchitectureConsultant")
    );
  }
  if (
    doc.category === "StructuralConsultant" &&
    !doc.structuralRegistrationDoc
  ) {
    return next(
      new Error(
        "structuralRegistrationDoc is required for StructuralConsultant"
      )
    );
  }
  if (doc.category === "Contractor" && !doc.constructionLicenseDoc) {
    return next(new Error("constructionLicenseDoc is required for Contractor"));
  }
  const words = (doc.shortDescription || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 100 || words > 150) {
    return next(new Error("shortDescription must be 100–150 words"));
  }
  next();
});

export const vendorSignUpModel = mongoose.model(
  "Vendor",
  BusinessProfileSchema
);
