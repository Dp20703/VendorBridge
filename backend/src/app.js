import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";

import authRoutes from "./modules/auth/auth.routes.js"

import errorHandler from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

const app = express();

/* SECURITY */

app.use(helmet());
app.use(compression());

/* LOGGGING */
app.use(morgan("dev"));

/* RATE LIMIT */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

/* CORS */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

/* BODY */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

/* ROUTES */
app.use("/api/v1/auth", authRoutes);

// /* ERROR */
app.use(errorHandler);

// /* NOT FOUND */
app.use(notFoundMiddleware);

export default app;
