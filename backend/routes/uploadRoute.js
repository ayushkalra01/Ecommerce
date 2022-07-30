const express = require("express");
const { tokenCheck, adminCheck } = require("../middleware/authMiddleware");
const { uploadFile, removeFile } = require("../controllers/uploadController");
const router = express.Router();

router.route("/upload").post(tokenCheck, adminCheck, uploadFile);
router.route("/remove").post(tokenCheck, adminCheck, removeFile);

module.exports = router;
