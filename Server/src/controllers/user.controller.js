import Userfile from "../models/Userfile.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.config.js";
async function Details(req, res) {
  try {
    const username = req.user;
    const response = await User.findOne({ username: username });
    res.status(200).json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

async function Delete(req, res) {
  try {
    const username = req.user;
    const data = await Userfile.find({ username: username });
    data.map(async (response) => {
      await cloudinary.uploader.destroy(response.filepublicid, {
        resource_type: response.filetype,
      });
    });
    await Userfile.deleteMany({ username: username });
    await User.deleteOne({ username: username });
    res.status(200).json({ message: "Account Delete Sucessfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

export default { Delete, Details };
