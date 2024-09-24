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
const creatorRouter = express_1.default.Router();
exports.creatorRouter = creatorRouter;
// WARN: No signup route since the admins will be provided as an env variable
creatorRouter.post("/signup", (req, res) => {
});
creatorRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.headers;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                msg: "all fields required",
            });
        }
        const user = yield db_1.UserModel.findOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
        });
        if (!user) {
            return res.status(404).json({
                msg: "user not found, please signup",
            });
        }
        const passCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!passCorrect) {
            return res.status(401).json({
                msg: "incorrect password",
            });
        }
        if (user.role !== db_1.UserRole.CREATOR) {
            return res.status(403).json({
                msg: "provided email is not registered as creator either login as user or register as a creator",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            msg: "signin successful",
            token,
        });
    }
    catch (e) {
        console.log(`creator signin error: ${e}`);
        return res.status(500);
    }
}));
// NOTE: route for creating a new course
creatorRouter.post("/course", () => { });
// NOTE: route for updating the course
creatorRouter.patch("/course", () => { });
// NOTE: returns all the courses the admin has
creatorRouter.get("/course/bulk", () => { });
