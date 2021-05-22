import express, { Request, Response, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas/index";
import cors from "cors";
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
