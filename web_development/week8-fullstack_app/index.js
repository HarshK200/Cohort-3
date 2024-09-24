"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
const admin_1 = require("./routes/admin");
const courses_1 = require("./routes/courses");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
// middlewares
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongoose connected!");
});
// Routes
app.use("/api/v1/creator", admin_1.creatorRouter);
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/courses", courses_1.coursesRouter);
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
