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
exports.PurchaseModel = exports.CourseModel = exports.CreatorModel = exports.UserModel = void 0;
exports.connectToMongo = connectToMongo;
const mongoose_1 = __importDefault(require("mongoose"));
function connectToMongo() {
    return new Promise((resolve, _reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_URL);
            console.log("mongoose connected!");
            resolve(true);
        }
        catch (e) {
            console.log(`couldn't connect to mongodb error: ${e}`);
            resolve(false);
        }
    }));
}
const User = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const Creator = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const Course = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "creators",
        required: true,
    },
});
const Purchase = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    courseid: { type: mongoose_1.default.Types.ObjectId, ref: "courses", require: true },
    userid: { type: mongoose_1.default.Types.ObjectId, ref: "users", require: true },
});
const UserModel = mongoose_1.default.model("users", User);
exports.UserModel = UserModel;
const CreatorModel = mongoose_1.default.model("creators", Creator);
exports.CreatorModel = CreatorModel;
const CourseModel = mongoose_1.default.model("courses", Course);
exports.CourseModel = CourseModel;
const PurchaseModel = mongoose_1.default.model("purchases", Purchase);
exports.PurchaseModel = PurchaseModel;
