"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const coursesRouter = express_1.default.Router();
exports.coursesRouter = coursesRouter;
// NOTE: todo returns a list of all the courses available for purchase
coursesRouter.get("/bulk", (_req, _res) => { });
// NOTE: endpoint hit when previewing a courser for free no login required
coursesRouter.get("/courseid/preview", (_req, res) => {
    return res.status(200).json({ msg: "course preview endpoint" });
});
// NOTE: endpoint hit when purchasing a course authentication required
coursesRouter.post("/courseid/purchase", auth_1.userAuth, (_req, _res) => { });
