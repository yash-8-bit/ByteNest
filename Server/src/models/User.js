import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is already taken"],
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
});
const User = mongoose.model("user", Userschema);

export default User;
