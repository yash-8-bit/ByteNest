import multer from "multer";
import Userfile from "../models/Userfile.js";
import dbFunction from "../util/dbfunction.util.js";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

async function countfile(req, res, next) {
  dbFunction({
    main: async () => {
      const count = await Userfile.countDocuments({ UserId: req.user._id });
      if (count >= 10)
        return res.status(400).json({ message: "Limit Reached" });
      next();
    },
    res: res
  })
}

export default { upload, countfile };
