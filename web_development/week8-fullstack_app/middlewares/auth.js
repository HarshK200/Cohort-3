"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = userAuth;
exports.creatorAuth = creatorAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userAuth(req, res, next) {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // NOTE: assuming the authorization header has bearer attached to it
    if (!token) {
        return res
            .status(403)
            .json({ msg: "authentication token not provided. Please login/signup" });
    }
    if (!config_1.JWT_SECRET_USER) {
        console.log("Err: JWT_SECRET_USER env not provided!");
        return res.status(500).json({ msg: "internal server error!" });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_USER);
        req.body.userid = verified.userid;
        next();
    }
    catch (e) {
        return res
            .status(403)
            .json({ msg: "invalid authentication token. please login/signup again" });
    }
}
function creatorAuth(req, res, next) {
    var _a;
    // TODO: authentication logic for creatorAuth
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // NOTE: assuming the authorization header has bearer attached to it
    if (!token) {
        return res
            .status(403)
            .json({ msg: "authentication token not provided. Please login/signup" });
    }
    if (!config_1.JWT_SECRET_CREATOR) {
        console.log("Err: JWT_SECRET_CREATOR env not provided!");
        return res.status(500).json({ msg: "internal server error!" });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_CREATOR);
        req.body.creatorid = verified.creatorid;
        next();
    }
    catch (e) {
        return res
            .status(403)
            .json({ msg: "invalid authentication token. please login/signup again" });
    }
}
