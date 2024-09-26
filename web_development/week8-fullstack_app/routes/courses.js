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
exports.coursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const coursesRouter = express_1.default.Router();
exports.coursesRouter = coursesRouter;
// NOTE: endpoint hit when previewing a courser for free no login required
coursesRouter.get("/preview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield db_1.CourseModel.find({});
        return res.status(200).json({
            msg: "successfully retrived all courses",
            courses: courses,
        });
    }
    catch (e) {
        console.log(`error retreving courses from db: ${e}`);
        return res.status(500).json({
            msg: "Internal server error, couldn't retrive courses",
        });
    }
}));
// NOTE: endpoint hit when purchasing a course authentication required
coursesRouter.post("/courseid/purchase", auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseid } = req.body;
    const userid = req.body.userid;
    if (!courseid) {
        return res.status(400).json({
            msg: "no course id provided",
        });
    }
    try {
        const prev_purchase = yield db_1.PurchaseModel.findOne({
            userid: userid,
            courseid: courseid,
        });
        if (prev_purchase) {
            return res.status(409).json({
                msg: "error you have already purchased the course,you cannot buy twice",
            });
        }
        // TODO: add razor pay or strip payment logic
        yield db_1.PurchaseModel.create({
            _id: new mongoose_1.default.Types.ObjectId(),
            userid: userid,
            courseid: courseid,
        });
        return res.status(201).json({
            msg: `course with id: ${courseid} purchased successfully`,
        });
    }
    catch (e) {
        console.log(`error in creating new purchase ${e}`);
        return res.status(500).json({
            msg: "internal server error while purchasing",
        });
    }
}));
