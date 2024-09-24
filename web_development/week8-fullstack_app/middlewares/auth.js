"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    //TODO: authentication logic
    const { token } = req.headers;
    if (!token) {
        return res
            .status(403)
            .json({ msg: "authentication token not provided. Please login/signup" });
    }
    // HACK: DO A LITTLE BETTER ERROR HANDLING (edgecase: JWT_SECRET is not correct i.e. a server err user still gets 403 bad req)
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.body.userid = verified.userid;
        req.body.email = verified.email;
        next();
    }
    catch (e) {
        return res
            .status(403)
            .json({ msg: "invalid authentication token. please login/signup again" });
    }
}
