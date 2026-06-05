// Load environment variables before any other module is evaluated.
// (ES module imports are hoisted, so this side-effect import must come first
//  to guarantee process.env is populated when app.js configures CORS.)
import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
