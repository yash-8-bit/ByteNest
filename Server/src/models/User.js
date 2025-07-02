import mongoose from "mongoose";

const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
});

const User = mongoose.model("user_data", Userschema);
export default User;
