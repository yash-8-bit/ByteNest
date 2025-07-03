import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/dbconfig.js";
import cors from "cors";
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);
connectDB();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
