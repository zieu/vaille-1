import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection successful"));

const PORT = process.env.PORT;
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, () => console.log(`app is running on port ${PORT}`));
