import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../", "tmpfile"));
  },
  filename: function (req, file, cb) {
    cb(null, req.user + "_x_" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
