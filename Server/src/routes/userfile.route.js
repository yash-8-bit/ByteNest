import middlewarefile from "../middleware/file.middleware.js";
import express from "express";
import userfile from "../controllers/userfile.controller.js";
import verifytoken from "../middleware/auth.middleware.js";

const Userfileroute = express.Router();

Userfileroute.post(
  "/upload-file",
  verifytoken,
  middlewarefile.countfile,
  middlewarefile.upload.single("__file__"),
  userfile.uploadfile
);
Userfileroute.delete("/delete-file/:_id", verifytoken, userfile.deletefile);
Userfileroute.get("/get-files", verifytoken, userfile.getfiles);

export default Userfileroute;
