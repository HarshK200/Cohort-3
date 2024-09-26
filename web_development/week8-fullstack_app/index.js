"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const creator_1 = require("./routes/creator");
const courses_1 = require("./routes/courses");
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 3000;
// middlewares
app.use(express_1.default.json());
// Routes
app.use("/api/v1/creator", creator_1.creatorRouter);
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/courses", courses_1.coursesRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield (0, db_1.connectToMongo)();
        if (!connected) {
            console.log("server startup canceled...");
            return;
        }
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        });
    });
}
main();
