import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { creatorRouter } from "./routes/admin";
import { coursesRouter } from "./routes/courses";
import { connectToMongo } from "./db";

dotenv.config();
const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());

// Routes
app.use("/api/v1/creator", creatorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", coursesRouter);

async function main() {
  const connected = await connectToMongo();

  if (!connected) {
    console.log("server startup canceled...");
    return;
  }

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}

main();
