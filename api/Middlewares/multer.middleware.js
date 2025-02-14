import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/upload");
    },
    filename: function (req, file, cb) {
        const fn =
            crypto.randomBytes(16).toString("hex") +
            path.extname(file.originalname);
        cb(null, fn);
    },
});

const upload = multer({ storage: storage });

export default upload;
