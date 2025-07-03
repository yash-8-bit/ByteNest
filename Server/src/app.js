import express from "express";
import Userroute from "./routes/auth.route.js";
import Userfileroute from "./routes/userfile.route.js";

const app = express();

app.use(express.json());
app.use("/api/user", Userroute);
app.use("/api/user", Userfileroute);

export default app;
