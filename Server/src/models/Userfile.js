import mongoose from "mongoose";


const Fileschema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
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
