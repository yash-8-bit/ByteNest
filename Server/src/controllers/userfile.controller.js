import cloudinary from "../config/cloudinaryconfig.js";
import Userfile from "../models/Userfile.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadfile(req, res) {
  try {
    const { filename } = req.body;
    const username = req.user;
    const filenamelocal =
      username + "_x_" + path.extname(req.file.originalname);
    const result = await cloudinary.uploader.upload(
      path.join(__dirname, "../../", "tmpfile", filenamelocal),
      {
        resource_type: "auto",
      }
    );
    fs.unlinkSync(path.join(__dirname, "../../", "tmpfile", filenamelocal));
    const userfile = await Userfile({
      username: username,
      pathurl: result.secure_url,
      filename: filename,
      filepublicid: result.public_id,
      filetype: result.resource_type,
    });
    await userfile.save();
    console.info(result);
    res.status(201).json({ message: "File Uploaded Successfully" });
  } catch (error) {
    const filenamelocal =
      req.user + "_x_" + path.extname(req.file.originalname);
    fs.unlinkSync(path.join(__dirname, "../../", "tmpfile", filenamelocal));
    console.error(error);
  }
}

async function deletefile(req, res) {
  try {
    const { filepublicid, filetype, id } = req.body;
    await Userfile.deleteOne({ _id: id });
    await cloudinary.uploader.destroy(filepublicid, {
      resource_type: filetype,
    });
    res.status(202).json({ message: "File Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
}

async function getfiles(req, res) {
  try {
    const response = await Userfile.find({ username: req.user });
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
}

export default { uploadfile, deletefile, getfiles };
