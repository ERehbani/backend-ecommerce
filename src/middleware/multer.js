const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "src/public/uploads/";

    if (file.fieldname === "profileImage") {
      uploadPath += "profiles";
    } else if (file.fieldname === "productImage") {
      uploadPath += "products";
    } else if (file.fieldname === "document") {
      uploadPath += "documents";
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
