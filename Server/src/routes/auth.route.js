import express from "express";
import auth from "../controllers/auth.controller.js";

const Authroute = express.Router();

Authroute.post("/login", auth.login);
Authroute.post("/register", auth.register);

export default Authroute;
