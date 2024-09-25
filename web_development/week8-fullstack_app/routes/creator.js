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
exports.creatorRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const creatorRouter = express_1.default.Router();
exports.creatorRouter = creatorRouter;
// NOTE: right now the code looks repetitive/similar to userRouter signup but this gives flexibility to add more fields in the future
creatorRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            role: db_1.UserRole.CREATOR,
        });
        return res.status(200).json({ msg: "signup successful" });
    }
    catch (e) {
        console.log(`error during creating new user in db: ${e}`);
        return res
            .status(500)
            .json({ msg: "internal server error cannot register user" });
    }
}));
creatorRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const creator = yield db_1.UserModel.findOne({
            email: email,
            role: db_1.UserRole.CREATOR,
        });
        if (!creator) {
            return res.status(404).json({
                msg: "user with email not registered as creator please signup",
            });
        }
        const pass_correct = yield bcrypt_1.default.compare(password, creator.password);
        if (!pass_correct) {
            return res.status(401).json({ msg: "error invalid credentials" });
        }
        const tokenPayload = {
            creatorid: creator._id,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET_CREATOR);
        return res.status(200).json({ msg: "signin successful!", token: token });
    }
    catch (e) {
        console.log(`err: ${e}`);
        return res.status(500).json({ msg: "internal server error" });
    }
}));
// TODO: route to creating a new course
creatorRouter.post("/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creatorid = req.body.creatorid;
    const { title, description, imageurl, price } = req.body;
    const course = yield db_1.CourseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageurl,
        creatorid: creatorid,
    });
}));
// TODO: route for updating the course
creatorRouter.patch("/course", () => { });
// TODO: returns all the courses the admin has
creatorRouter.get("/course/bulk", () => { });
