import multer from "multer";
import Userfile from "../models/Userfile.js";
import dbFunction from "../util/dbfunction.util.js";

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})
const uploadMiddleware = (req, res, next) => {
  upload.single("__file__")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File Size must be less than 5 MB" })
      }
      return res.status(400).json({ message: "Something Went Wrong" })
    }
    next()
  })
}
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

export default { countfile, uploadMiddleware };
