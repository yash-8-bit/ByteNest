import express from "express";
import Userroute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use("/api/user", Userroute);

export default app;
