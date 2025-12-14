import cloudinary from "../config/cloudinary.config.js";
import Userfile from "../models/Userfile.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dbFunction from "../util/dbfunction.util.js";
import randtoken from "rand-token"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compareDate = (date) => {
  const givenTime = new Date(date);
  const expiryTime = new Date(givenTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  return now < expiryTime
}

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
        url: result.secure_url,
        name: filename,
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
      const username = req.user;
      const data = await Userfile.findOne({ _id: _id, username });
      await cloudinary.uploader.destroy(data.filepublicid, {
        resource_type: data.filetype,
      });
      await Userfile.deleteOne({ _id: _id, username });
      res.status(200).json({ message: "File Deleted Successfully" });
    },
    res: res
  })
}

async function GET(req, res) {
  dbFunction({
    main: async () => {
      const data = await Userfile.find({ username: req.user },
        "name url filetype"
      );
      res.status(200).json({ data });
    }
  })
}

async function getOneByToken(req, res) {
  dbFunction({
    main: async () => {
      const { token } = req.query;
      const data = await Userfile.findOne({
        "share.token": token
      }, "share _id name url filetype username");
      if (!data) return res.status(404).json({ "message": "file not found" });
      if (compareDate(data.share.expire_at))
        return res.status(200).json({ data });
      res.status(404).json({ "message": "Link Expired" });
    }
  })
}

async function PUT(req, res) {
  dbFunction({
    main: async () => {
      const { _id } = req.params;
      const username = req.user;
      const token = randtoken.generate(16);
      await Userfile.findOneAndUpdate({ _id, username }, {
        share: {
          token,
          expire_at: new Date()
        }
      });
      res.status(200).json({ data: token });
    }
  })
}

export default { POST, DELETE, GET, PUT, getOneByToken };
