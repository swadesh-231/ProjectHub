
import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/db.js";
import express from "express";
import path from "path";

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// serve the built frontend (Frontend/dist) and let the SPA handle client-side
// routing: anything that isn't an /api request falls back to index.html
const frontendPath = path.join(__dirname, "Frontend", "dist");
app.use(express.static(frontendPath));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

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
