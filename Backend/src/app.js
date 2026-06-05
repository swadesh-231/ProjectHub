import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// cors config
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    // "*" → reflect the request origin (works alongside credentials); otherwise
    // allow the explicit comma-separated list from CORS_ORIGIN.
    origin: corsOrigin === "*" ? true : corsOrigin.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//routes

import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import noteRouter from "./routes/note.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);

// global error handler (must be last)
app.use(errorHandler);

export default app;
