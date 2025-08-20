// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder = "uploads/temp";
//     if (file.fieldname === "licenseImage") {
//       folder = "uploads/license";
//     } else if (file.fieldname === "portfolioThumbnailImage") {
//       folder = "uploads/portfolio";
//     }else if(file.fieldname === 'portfolioImage'){
//       folder = "uploads/personalPortfolio"
//     }else if (file.fieldname === 'projectImage'){
//         folder = "uploads/projects"
//     }else if (file.fieldname === 'projectExecutionImg'){
//         folder = "uploads/projects"
//     }else if (file.fieldname === 'presentaionBoardImg'){
//         folder = "uploads/projects"
//     }else if (file.fieldname === 'projectTechDocImg'){
//         folder = "uploads/projects"
//     }
//     fs.mkdirSync(folder, { recursive: true }); 
//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10 MB limit per file
//   },
// });

// export default upload;

import multer from "multer";
import fs from "fs";
import path from "path";

// ✅ Field → Folder mapping ek jagah maintain kar lo
const folderMap = {
  // Old fields
  licenseImage: "uploads/license",
  portfolioThumbnailImage: "uploads/portfolio",
  portfolioImage: "uploads/personalPortfolio",
  projectImage: "uploads/projects",
  projectExecutionImg: "uploads/projects",
  presentaionBoardImg: "uploads/projects",
  projectTechDocImg: "uploads/projects",

  // New fields
  companyRegistrationDoc: "uploads/companyDocs",
  coaRegistrationDoc: "uploads/companyDocs",
  structuralRegistrationDoc: "uploads/companyDocs",
  constructionLicenseDoc: "uploads/companyDocs",
  gstDocument: "uploads/companyDocs",
  businessPanCard: "uploads/companyDocs",
  logo: "uploads/logos",
  kycIdDocument:"uploads/kycdocument",
  styleGuideFile:"uploads/logostyle",

  //
  representativePhoto: "uploads/representatives",
  "teamMembers[0][photo]": "uploads/team",
  "projects[image]": "uploads/projects",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Default folder agar map me na mile
    let folder = folderMap[file.fieldname] || "uploads/temp";

    // Folder exist na ho toh create kar lo
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit per file
  },
});

export default upload;

