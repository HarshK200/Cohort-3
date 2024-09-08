"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const PORT = 3000;
const JWT_SECRET = "MYSECERT";
// setting up middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)()); // for cross origin data tranfer stuff
app.use((0, express_1.json)()); // for automatically parsing the data the we get from the front end
const USERS = [];
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
});
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = USERS.find((user) => user.username === username);
    if (userExists) {
        return res.status(400).json({ err: "user already exists please login" });
    }
    const newUser = {
        username: username,
        password: password,
    };
    USERS.push(newUser);
    res.status(200).json({
        success: true,
        msg: "You have signed up",
    });
});
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = USERS.find((user) => user.username === username && user.password === password);
    // when user doesn't exists in the db
    if (!user) {
        return res.status(400).json({
            err: "invalid credentials",
        });
    }
    const token = jsonwebtoken_1.default.sign(user, JWT_SECRET);
    user.token = token;
    res.status(200).json({
        token: token,
    });
    console.log(user);
});
// authentication middleware
function auth(req, res, next) {
    const token = req.headers.token;
    if (!token)
        return res
            .status(400)
            .json({ err: "invalid credentials! try logging in again" });
    const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (!user) {
        return res.status(400).json({ err: "Invalid credentials" });
    }
    const foundUser = USERS.find((x) => x.username === user.username && x.password === user.password);
    if (!foundUser) {
        return res.status(404).json({ err: "user not registered! please signup" });
    }
    req.body.user = user;
    next();
}
app.get("/me", auth, (req, res) => {
    const user = req.body.user;
    res
        .status(200)
        .json({ success: true, username: user.username, password: user.password });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
