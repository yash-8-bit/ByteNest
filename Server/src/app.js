import express from "express";
import Userauthroute from "./routes/auth.route.js";
import Userfileroute from "./routes/userfile.route.js";
import cors from "cors";
import Userroute from "./routes/user.js";
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.use(express.json());
app.use("/api/userauth", Userauthroute);
app.use("/api/userfile", Userfileroute);
app.use("/api/user", Userroute);

export default app;
