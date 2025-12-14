import app from "./app.js";
import connectDB from "./config/db.config.js";
connectDB();
const port = process.env.PORT;

if (!port) throw new Error("PORT is not defined in .env")

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
