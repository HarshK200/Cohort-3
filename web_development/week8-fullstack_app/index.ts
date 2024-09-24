import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { creatorRouter } from "./routes/admin";
import { coursesRouter } from "./routes/courses";

dotenv.config();
const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log("mongoose connected!");
});

// Routes
app.use("/api/v1/creator", creatorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
