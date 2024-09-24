import express from "express";
import auth from "../middlewares/auth";

const coursesRouter = express.Router();

// NOTE: todo returns a list of all the courses available for purchase
coursesRouter.get("/bulk", (_req, _res) => {});

// NOTE: endpoint hit when previewing a courser for free no login required
coursesRouter.get("/courseid/preview", (_req, res) => {
  return res.status(200).json({ msg: "course preview endpoint" });
});

// NOTE: endpoint hit when purchasing a course authentication required
coursesRouter.post("/courseid/purchase", auth, (_req, _res) => {});

export { coursesRouter };
