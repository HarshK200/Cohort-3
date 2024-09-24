"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = exports.CourseModel = exports.UserRole = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["CREATOR"] = "CREATOR";
})(UserRole || (exports.UserRole = UserRole = {}));
const User = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [UserRole.CREATOR, UserRole.USER],
        default: UserRole.USER,
    },
});
const Course = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorid: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true },
});
const Purchase = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    courseid: { type: mongoose_1.default.Types.ObjectId, ref: "courses", require: true },
    userid: { type: mongoose_1.default.Types.ObjectId, ref: "users", require: true },
});
const UserModel = mongoose_1.default.model("users", User);
exports.UserModel = UserModel;
const CourseModel = mongoose_1.default.model("courses", Course);
exports.CourseModel = CourseModel;
const PurchaseModel = mongoose_1.default.model("purchases", Purchase);
exports.PurchaseModel = PurchaseModel;
