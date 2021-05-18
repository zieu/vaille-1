import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
dotenv.config();

const DB = process.env.MONGO_URI;
mongoose
  // @ts-ignore
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection successfull"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
