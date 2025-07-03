import mongoose from "mongoose";

const Fileschema = mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  pathurl: { type: String, required: true },
  filepublicid: { type: String, required: true },
  filetype: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Userfile = mongoose.model("user_data_file", Fileschema);
export default Userfile;
