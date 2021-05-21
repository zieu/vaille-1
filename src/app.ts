import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(cors());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
