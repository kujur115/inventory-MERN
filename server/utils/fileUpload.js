const multer = require("multer");
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) return "0 Bytes";

  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  let i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))}  ${sizes[i]}`;
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() +
        "-" +
        file.originalname.replace(/[^a-z0-9]/gi, "").slice(0, 50)
    ); // keep only alphanumeric characters
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });
module.exports = { fileSizeFormatter, upload };
