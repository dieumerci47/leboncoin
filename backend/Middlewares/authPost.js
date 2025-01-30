const multer = require("multer");
const date = Date.now();
const MIMETYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: async (req, file, cb) => {
    const ext = MIMETYPE[file.mimetype];
    const Name = req.body.name.split(" ").join("_") + Date.now();
    cb(null, Name + "." + "jpg");
  },
});

module.exports = multer({ storage }).single("file");
