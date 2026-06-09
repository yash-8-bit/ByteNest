import cloudinary from "../config/cloudinary.config.js";
import Userfile from "../models/Userfile.js";
import dbFunction from "../util/dbfunction.util.js";


const compareDate = (date) => {
  const givenTime = new Date(date);
  const expiryTime = new Date(givenTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  return now < expiryTime
}

async function POST(req, res) {
  const { _id } = req.user;
  dbFunction({
    main: async () => {
      const { filename } = req.body;
      if (!filename.trim()) return req.status(400).json({ message: "FileName is Required" })
      if (!req.file) return req.status(400).json({ message: "File is Required" })
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "byteNestFiles", resource_type: "auto" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(req.file.buffer);
      });
      const token = crypto.randomUUID();
      const userfile = await Userfile({
        UserId: _id,
        url: uploadResult.secure_url,
        name: filename,
        filepublicid: uploadResult.public_id,
        filetype: uploadResult.resource_type,
        share: {
          token
        }
      });
      await userfile.save();
      res.status(201).json({ message: "File Uploaded Successfully" });
    },
    res: res
  })

}

async function DELETE(req, res) {
  dbFunction({
    main: async () => {
      const id = req.params.id;
      const { _id } = req.user;
      const data = await Userfile.findOne({ _id: id, UserId: _id });
      if (!data) return req.status(400).json({ message: "User Not Found" })
      await cloudinary.uploader.destroy(data.filepublicid, {
        resource_type: data.filetype,
      });
      await Userfile.deleteOne({ _id: id, UserId: _id });
      res.status(200).json({ message: "File Deleted Successfully" });
    },
    res: res
  })
}
async function GET(req, res) {
  dbFunction({
    main: async () => {
      const data = await Userfile.find({ UserId: req.user._id },
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
      if (!token) return res.status(400).json({ "message": "Invalid Url" });
      const data = await Userfile.findOne({
        "share.token": token,
      }, "share _id name url filetype").populate("UserId", "username");
      if (!data) return res.status(404).json({ "message": "file not found" });
      if (compareDate(data.share.expire_at))
        return res.status(200).json({
          data: {
            _id: data._id,
            name: data.name,
            url: data.url,
            filetype: data.filetype,
            username: data.UserId.username
          }
        });
      res.status(404).json({ "message": "Link Expired" });
    }
  })
}

async function PUT(req, res) {
  dbFunction({
    main: async () => {
      const { id } = req.params;
      const { _id } = req.user;
      const token = crypto.randomUUID();
      await Userfile.findOneAndUpdate({ _id: id, UserId: _id }, {
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
