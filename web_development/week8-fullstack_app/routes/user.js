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
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const config_1 = require("../config");
const auth_1 = require("../middlewares/auth");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const formData = { firstName, lastName, email, password };
    const formDataValidation = zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(2, "firstname must be at least 2 characters")
            .max(20, "firstname cannot be more than 20 characters"),
        lastName: zod_1.z
            .string()
            .min(2, "lastname must be at least 2 characters")
            .max(20, "lastname cannot be more than 20 characters"),
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(8, "password must be at least 8")
            .max(20, "password cannot be longer than 20 characters"),
    });
    const validFormdata = formDataValidation.safeParse(formData);
    if (!validFormdata.success) {
        return res.status(400).json({
            msg: validFormdata.error.issues[0].message,
        });
    }
    const existing_user = yield db_1.UserModel.findOne({
        email: email,
    });
    if (existing_user) {
        return res
            .status(409)
            .json({ msg: "User with same email already exists please signin" });
    }
    const hashed_password = yield bcrypt_1.default.hash(password, 10);
    try {
        yield db_1.UserModel.create({
            _id: new mongoose_1.default.Types.ObjectId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashed_password,
        });
        return res.status(201).json({ msg: "signup successful" });
    }
    catch (e) {
        console.log(`error during creating new user in db: ${e}`);
        return res
            .status(500)
            .json({ msg: "internal server error cannot register user" });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const formData = {
        email,
        password,
    };
    const formDataValidation = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(8, "password must be at least 8")
            .max(20, "password cannot be longer than 20 characters"),
    });
    const verifiedFormdata = formDataValidation.safeParse(formData);
    if (!verifiedFormdata.success) {
        return res.status(400).json({
            msg: verifiedFormdata.error.issues[0].message,
        });
    }
    try {
        const user = yield db_1.UserModel.findOne({
            email: email,
        });
        if (!user) {
            return res
                .status(404)
                .json({ msg: "user with email is not registered please signup" });
        }
        const pass_correct = yield bcrypt_1.default.compare(password, user.password);
        if (!pass_correct) {
            return res.status(401).json({ msg: "error invalid credentials" });
        }
        const tokenPayload = {
            userid: user._id,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, config_1.JWT_SECRET_USER);
        return res.status(200).json({ msg: "signin successful!", token: token });
    }
    catch (e) {
        console.log(`err: ${e}`);
        return res.status(500).json({ msg: "internal server error" });
    }
}));
userRouter.get("/purchases", auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.body.userid;
    try {
        // NOTE: checking if user exists or not
        const user = yield db_1.UserModel.findOne({
            _id: userid,
        });
        if (!user) {
            return res.status(404).json({
                msg: "user does not exist",
            });
        }
        const userPurchases = yield db_1.PurchaseModel.find({
            userid: userid,
        });
        return res.status(200).json({
            msg: "successfully fetched all the user purchases",
            userPurchases: userPurchases,
        });
    }
    catch (e) {
        console.log(`error while fetching user purchases: ${e}`);
        return res.status(500).json({
            msg: "Internal server error,couldn't fetch user purchases",
        });
    }
}));
