const multer = require("multer");
const path = require("path");
const fs = require("fs");

/*  ENSURE UPLOADS FOLDER EXISTS */
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/*  STORAGE CONFIG */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);   //  Always safe
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
