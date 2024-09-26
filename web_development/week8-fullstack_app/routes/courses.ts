import express from "express";
import { userAuth } from "../middlewares/auth";
import { CourseModel, PurchaseModel } from "../db";
import mongoose from "mongoose";

const coursesRouter = express.Router();

// NOTE: endpoint hit when previewing a courser for free no login required
coursesRouter.get("/preview", async (req, res) => {
  try {
    const courses = await CourseModel.find({});

    return res.status(200).json({
      msg: "successfully retrived all courses",
      courses: courses,
    });
  } catch (e) {
    console.log(`error retreving courses from db: ${e}`);
    return res.status(500).json({
      msg: "Internal server error, couldn't retrive courses",
    });
  }
});

// NOTE: endpoint hit when purchasing a course authentication required
coursesRouter.post("/courseid/purchase", userAuth, async (req, res) => {
  const { courseid } = req.body;
  const userid = req.body.userid;

  if (!courseid) {
    return res.status(400).json({
      msg: "no course id provided",
    });
  }

  try {
    const prev_purchase = await PurchaseModel.findOne({
      userid: userid,
      courseid: courseid,
    });

    if (prev_purchase) {
      return res.status(409).json({
        msg: "error you have already purchased the course,you cannot buy twice",
      });
    }



    // TODO: add razor pay or strip payment logic



    // TODO: check if user has payed for the course or not?
    await PurchaseModel.create({
      _id: new mongoose.Types.ObjectId(),
      userid: userid,
      courseid: courseid,
    });

    return res.status(201).json({
      msg: `course with id: ${courseid} purchased successfully`,
    });
  } catch (e) {
    console.log(`error in creating new purchase ${e}`);
    return res.status(500).json({
      msg: "internal server error while purchasing",
    });
  }
});

export { coursesRouter };
