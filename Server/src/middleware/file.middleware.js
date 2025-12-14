import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Userfile from "../models/Userfile.js";
import fs from "fs";
import dbFunction from "../util/dbfunction.util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let dirpath = path.join(__dirname, "../../", "tmpfile");
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath, {
        recursive: true,
      });
    }
    callback(null, dirpath);
  },
  filename: function (req, file, callback) {
    callback(null, req.user + "_x_" + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

async function countfile(req, res, next) {
  dbFunction({
    main: async () => {
      const count = await Userfile.countDocuments({ username: req.user });
      if (count >= 10)
        return res.status(400).json({ message: "Limit Reached" });
      next();
    },
    res: res
  })
}

export default { upload, countfile };
