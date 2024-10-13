import express from "express";
import { userRouter } from "./routes/user";
import { creatorRouter } from "./routes/creator";
import { coursesRouter } from "./routes/courses";
import { connectToMongo } from "./db";
//@ts-ignore
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(cookieParser());

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
