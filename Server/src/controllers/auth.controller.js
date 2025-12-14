import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dbFunction from "../util/dbfunction.util.js"
async function register(req, res) {
  dbFunction({
    main: async () => {
      const { name, username, password } = req.body;
      const is_user = await User.findOne({ username: username });
      if (is_user)
        return res.status(400).json({ message: "Username is already Exist" });
      const securepassword = await bcrypt.hash(password, 12);
      const user = await User({
        name, username,
        password: securepassword,
      });
      await user.save();
      const token = jwt.sign({ username: username }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      res.status(201).json({ message: "Register Successfull", token: token });
    },
    res: res
  })
}

async function login(req, res) {
  dbFunction({
    main: async () => {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) return res.status(400).json({ message: "Invalid Username" });
      const is_true = await bcrypt.compare(password, user.password);
      if (!is_true) return res.status(400).json({ message: "Invalid Password" });
      const token = jwt.sign({ username: username }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      res.status(201).json({ message: "Login Successfull", token: token });
    },
    res : res
  })
  
}

export default { login, register };
