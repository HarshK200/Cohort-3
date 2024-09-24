import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { creatorRouter } from "./routes/admin";
import { coursesRouter } from "./routes/courses";
import { connectToMongo } from "./db";

dotenv.config();
connectToMongo();
const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());

// Routes
app.use("/api/v1/creator", creatorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
