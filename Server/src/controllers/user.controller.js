import Userfile from "../models/Userfile.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.config.js";
import dbFunction from "../util/dbfunction.util.js";
async function GET(req, res) {
  dbFunction({
    main: async () => {
      const username = req.user;
      const data = await User.findOne({ username: username });
      res.status(200).json({ data });
    },
    res: res
  })
}

async function DELETE(req, res) {
  dbFunction({
    main: async () => {
      const username = req.user;
      const data = await Userfile.find({ username: username });
      data.map(async (item) => {
        await cloudinary.uploader.destroy(item.filepublicid, {
          resource_type: item.filetype,
        });
      });
      await Userfile.deleteMany({ username: username });
      await User.deleteOne({ username: username });
      res.status(200).json({ message: "Account Delete Successfully" });
    },
    res: res
  })

}

export default { GET, DELETE };
