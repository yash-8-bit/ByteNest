import mongoose from "mongoose";

const Fileschema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  pathurl: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const File = mongoose.model("user_data", Fileschema);
export default File;
