import app from "./app.js";
import connectDB from "./config/db.config.js";
connectDB();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
