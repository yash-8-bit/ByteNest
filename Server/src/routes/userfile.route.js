import middlewarefile from "../middleware/file.middleware.js";
import express from "express";
import userfile from "../controllers/userfile.controller.js";
import verifytoken from "../middleware/auth.middleware.js";

const Userfileroute = express.Router();

Userfileroute.post(
  "/",
  verifytoken,
  middlewarefile.countfile,
  middlewarefile.upload.single("__file__"),
  userfile.POST
);
Userfileroute.delete("/:_id", verifytoken, userfile.DELETE);
Userfileroute.get("/", verifytoken, userfile.GET);

export default Userfileroute;
