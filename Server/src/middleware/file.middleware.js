import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Userfile from "../models/Userfile.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirpath = path.join(__dirname, "../../", "tmpfile");
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath, {
        recursive: true,
      });
    }
    cb(null, dirpath);
  },
  filename: function (req, file, cb) {
    cb(null, req.user + "_x_" + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

async function countfile(req, res, next) {
  try {
    const count = await Userfile.countDocuments({ username: req.user });
    if (count >= 10)
      return res.status(400).json({ message: "Only 10 document are allowed" });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

export default { upload, countfile };
