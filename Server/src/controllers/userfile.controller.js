import cloudinary from "../config/cloudinary.config.js";
import Userfile from "../models/Userfile.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dbFunction from "../util/dbfunction.util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function POST(req, res) {
  const username = req.user;
  const filenamelocal = username + "_x_" + path.extname(req.file.originalname);
  const dirpath = path.join(__dirname, "../../", "tmpfile", filenamelocal);
  dbFunction({
    main: async () => {
      const { filename } = req.body;
      const result = await cloudinary.uploader.upload(
        dirpath,
        {
          resource_type: "auto",
        }
      );
      fs.unlinkSync(dirpath);
      const userfile = await Userfile({
        username: username,
        pathurl: result.secure_url,
        filename: filename,
        filepublicid: result.public_id,
        filetype: result.resource_type,
      });
      await userfile.save();
      res.status(201).json({ message: "File Uploaded Successfully" });
    },
    res: res,
    forerror: () => {
      fs.unlinkSync(dirpath);
    }
  })

}

async function DELETE(req, res) {
  dbFunction({
    main: async () => {
      const _id = req.params._id;
      const response = await Userfile.findOne({ _id: _id });
      await cloudinary.uploader.destroy(response.filepublicid, {
        resource_type: response.filetype,
      });
      await Userfile.deleteOne({ _id: _id });
      res.status(200).json({ message: "File Deleted Successfully" });
    },
    res: res
  })
}

async function GET(req, res) {
  dbFunction({
    main: async () => {
      const data = await Userfile.find({ username: req.user });
      res.status(200).json({ data });
    }
  })
}

export default { POST, DELETE, GET };
