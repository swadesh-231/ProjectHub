import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${suffix}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1000 * 1000, // 5 MB
  },
});
