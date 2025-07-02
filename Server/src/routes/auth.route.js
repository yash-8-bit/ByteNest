import express from "express";
import auth from "../controllers/auth.controller.js";

const Userroute = express.Router();

Userroute.post("/login", auth.login);
Userroute.post("/register", auth.register);

export default Userroute;
