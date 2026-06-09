import mongoose, { Schema } from "mongoose";


const Fileschema = new mongoose.Schema({
  name: { type: String, required: true },
  UserId : { type: Schema.Types.ObjectId, ref: 'user' },
  url: { type: String, required: true },
  filepublicid: { type: String, required: true },
  filetype: { type: String, required: true },
  share: {
    token: { type: String, unique: true },
    expire_at: { type: Date }
  }
});

const Userfile = mongoose.model("userfile", Fileschema);
export default Userfile;
