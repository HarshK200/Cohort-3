"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_USER = exports.JWT_SECRET_CREATOR = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
exports.JWT_SECRET_USER = JWT_SECRET_USER;
const JWT_SECRET_CREATOR = process.env.JWT_SECRET_CREATOR;
exports.JWT_SECRET_CREATOR = JWT_SECRET_CREATOR;
