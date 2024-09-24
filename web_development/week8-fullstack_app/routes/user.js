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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || lastName || !email || !password) {
        return res.status(400).json({ msg: "all fields are required" });
    }
    const existing_user = yield db_1.UserModel.findOne({
        email: email,
    });
    if (existing_user) {
        return res
            .status(409)
            .json({ msg: "User with same email already exists please login" });
    }
    const hashed_password = yield bcrypt_1.default.hash(password, 10);
    yield db_1.UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed_password,
        role: db_1.UserRole.USER,
    });
    return res.status(200).json({ msg: "signup successful" });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "all fields are required" });
    }
    const user = yield db_1.UserModel.findOne({
        email: email,
    });
    if (!user) {
        return res.status(404).json({ msg: "user with email not please signup" });
    }
    const pass_correct = yield bcrypt_1.default.compare(password, user.password);
    if (!pass_correct) {
        return res.status(401).json({ msg: "error invalid credentials" });
    }
    const tokenPayload = {
        userid: user.id,
        email: email,
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET);
    return res.status(200).json({ msg: "login successful!", token: token });
}));
// NOTE: shows all the courses bought by the signed-in user
userRouter.get("/purchases", (_req, _res) => { });
