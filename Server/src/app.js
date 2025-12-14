import express from "express";
import Authroute from "./routes/auth.route.js";
import Userfileroute from "./routes/userfile.route.js";
import cors from "cors";
import './config/dotenv.config.js'
import Userroute from "./routes/user.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.use(express.json());
app.use("/api/auth", Authroute);
app.use("/api/userfile", Userfileroute);
app.use("/api/user", Userroute);

export default app;
