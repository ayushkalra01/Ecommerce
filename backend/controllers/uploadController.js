const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

// cloudinary config

cloudinary.config({
  cloud_name: "doza6b93g",
  api_key: "437747147935875",
  api_secret: "9jhmkUCf1ocgXBiLsblMpMrHXvA",
});

//@desc   Upload File
//@routes POST /api/images/upload
//@access PRIVATE/ADMIN
const uploadFile = asyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", //jpeg,png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

//@desc   Remove Image
//@routes POST /api/images/remove
//@access PRIVATE/ADMIN
const removeFile = (req, res) => {
  const image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) throw new Error(err);
    res.send("deleted");
  });
};

module.exports = {
  uploadFile,
  removeFile,
};
