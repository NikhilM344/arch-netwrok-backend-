import { vendorSignUpModel } from "../../models/auth/vendorsignupmodle.js";

export const registerVendor = async (req, res) => {
  try {
    // `data` aayega as stringified JSON from frontend
    const body = JSON.parse(req.body.data);

    // File paths
    const licenseFile = req.files["licenseImage"]?.[0];
    const portfolioFile = req.files["portfolioThumbnailImage"]?.[0];

    const licenseImageUrl = licenseFile
      ? `http://localhost:3000/uploads/license/${licenseFile.filename}`
      : null;

    const thumbnailImageUrl = portfolioFile
      ? `http://localhost:3000/uploads/portfolio/${portfolioFile.filename}`
      : null;

    const vendor = new vendorSignUpModel({
      ...body,
      licenseImage: licenseImageUrl,
      portfolio: {
        ...body.portfolio,
        thumbnailImage: thumbnailImageUrl,
      },
    });

    await vendor.save();

    res.status(201).json({ success: true, vendor });
  } catch (error) {
    console.error("Vendor Register Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
