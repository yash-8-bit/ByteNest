import express from "express";
import verifytoken from "../middleware/auth.middleware.js";
import user from "../controllers/user.controller.js";

const Userroute = express.Router();

Userroute.get("/", verifytoken, user.GET);
Userroute.delete("/", verifytoken, user.DELETE);

export default Userroute;
