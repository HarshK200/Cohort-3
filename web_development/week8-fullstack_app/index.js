"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
const admin_1 = require("./routes/admin");
const courses_1 = require("./routes/courses");
const db_1 = require("./db");
dotenv_1.default.config();
(0, db_1.connectToMongo)();
const app = (0, express_1.default)();
const PORT = 3000;
// middlewares
app.use(express_1.default.json());
// Routes
app.use("/api/v1/creator", admin_1.creatorRouter);
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/courses", courses_1.coursesRouter);
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
