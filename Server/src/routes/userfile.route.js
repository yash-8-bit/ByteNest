import upload from "../middleware/file.middleware.js";
import express from "express";
import userfile from "../controllers/userfile.controller.js";
import verfiytoken from "../middleware/auth.middleware.js";

const Userfileroute = express.Router();

Userfileroute.post(
  "/upload-file",
  verfiytoken,
  upload.single("__file__"),
  userfile.uploadfile
);
Userfileroute.post("/delete-file", verfiytoken, userfile.deletefile);
Userfileroute.get("/get-files", verfiytoken, userfile.getfiles);

export default Userfileroute;
