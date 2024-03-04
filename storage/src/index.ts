import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import operationsRouter from "./routes/operations.route";

const app = express();
const PORT: number = parseInt(process.env.PORT!) || 3303;

dotenv.config();
app.use(express.json());

/**
 * Health check endpoint.
 */
app.get("/", (req: Request, res: Response) => {
  res.json({
    Status: "OK",
  });
});

/**
 * Database operations endpoint.
 */
app.use("/operations", operationsRouter);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.use("/operations", operationsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
