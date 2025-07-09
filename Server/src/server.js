import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/dbconfig.js";
dotenv.config();
connectDB();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
