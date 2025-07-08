import express from "express";
import auth from "../controllers/auth.controller.js";
import verifytoken from "../middleware/auth.middleware.js";

const Userroute = express.Router();

Userroute.post("/login", auth.login);
Userroute.post("/register", auth.register);
Userroute.delete("/delete", verifytoken, auth.Delete);

export default Userroute;
