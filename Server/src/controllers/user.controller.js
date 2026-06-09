import Userfile from "../models/Userfile.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.config.js";
import dbFunction from "../util/dbfunction.util.js";
async function GET(req, res) {
  dbFunction({
    main: async () => {
      const { _id } = req.user;
      const user = await User.findById(_id, "name username");
      const totalfile = await Userfile.countDocuments({UserId : _id})
      res.status(200).json({ data:{
        name : user.name,
        username :user.username,
        totalfile

      } });
    },
    res: res
  })
}

async function PUT(req, res) {
  dbFunction({
    main: async () => {
      const { _id } = req.user;
      const data = await User.findById(_id, "_id");
      if (!data)
        res.status(404).json({ message: "User is Invalid" });
      const body = req.body;
      if (body?.username) {
        const isExist = await User.findOne({ username: body.username }, "_id");
        if (isExist) return res.status(400).json({ message: "Username is Already Exist" })
      }
      await User.findOneAndUpdate({
        _id
      }, {
        ...(body?.name ? { name: body.name } : {}),
        ...(body?.username ? { username: body.username } : {})
      })
      res.status(200).json({ message: "Profile Updated" });
    },
    res: res
  })
}


async function DELETE(req, res) {
  dbFunction({
    main: async () => {
      const {_id} = req.user;
      const data = await Userfile.find({ _id });
      data.map(async (item) => {
        await cloudinary.uploader.destroy(item.filepublicid, {
          resource_type: item.filetype,
        });
      });
      await Userfile.deleteMany({ _id });
      await User.deleteOne({ _id });
      res.status(200).json({ message: "Account Delete Successfully" });
    },
    res: res
  })

}

export default { GET, DELETE, PUT };
