import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/temp";
    if (file.fieldname === "licenseImage") {
      folder = "uploads/license";
    } else if (file.fieldname === "portfolioThumbnailImage") {
      folder = "uploads/portfolio";
    }else if(file.fieldname === 'portfolioImage'){
      folder = "uploads/personalPortfolio"
    }else if (file.fieldname === 'projectImage'){
        folder = "uploads/projects"
    }else if (file.fieldname === 'projectExecutionImg'){
        folder = "uploads/projects"
    }else if (file.fieldname === 'presentaionBoardImg'){
        folder = "uploads/projects"
    }else if (file.fieldname === 'projectTechDocImg'){
        folder = "uploads/projects"
    }
    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
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
