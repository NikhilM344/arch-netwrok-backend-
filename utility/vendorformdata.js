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
    }

    fs.mkdirSync(folder, { recursive: true }); // Ensure folder exists
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export default upload;
