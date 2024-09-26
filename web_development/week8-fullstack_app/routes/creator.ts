import express from "express";
import { CourseModel, CreatorModel } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import mongoose from "mongoose";
import { JWT_SECRET_CREATOR } from "../config";
import { creatorAuth } from "../middlewares/auth";

const creatorRouter = express.Router();

// NOTE: right now the code looks repetitive/similar to userRouter signup but this gives flexibility to add more fields in the future
creatorRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const formData = { firstName, lastName, email, password };

  const formDataValidation = z.object({
    firstName: z
      .string()
      .min(2, "firstname must be at least 2 characters")
      .max(20, "firstname cannot be more than 20 characters"),
    lastName: z
      .string()
      .min(2, "lastname must be at least 2 characters")
      .max(20, "lastname cannot be more than 20 characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password must be at least 8")
      .max(20, "password cannot be longer than 20 characters"),
  });

  const validFormdata = formDataValidation.safeParse(formData);

  if (!validFormdata.success) {
    return res.status(400).json({
      msg: validFormdata.error.issues[0].message,
    });
  }

  const existing_user = await CreatorModel.findOne({
    email: email,
  });
  if (existing_user) {
    return res
      .status(409)
      .json({ msg: "User with same email already exists please signin" });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  try {
    await CreatorModel.create({
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password,
    });

    return res.status(201).json({ msg: "signup successful" });
  } catch (e) {
    console.log(`error during creating new user in db: ${e}`);
    return res
      .status(500)
      .json({ msg: "internal server error cannot register user" });
  }
});

creatorRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const formData = {
    email,
    password,
  };
  const formDataValidation = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password must be at least 8")
      .max(20, "password cannot be longer than 20 characters"),
  });

  const verifiedFormdata = formDataValidation.safeParse(formData);

  if (!verifiedFormdata.success) {
    return res.status(400).json({
      msg: verifiedFormdata.error.issues[0].message,
    });
  }

  try {
    const creator = await CreatorModel.findOne({
      email: email,
    });

    if (!creator) {
      return res.status(404).json({
        msg: "user with email not registered as creator please signup",
      });
    }

    const pass_correct = await bcrypt.compare(password, creator.password!);
    if (!pass_correct) {
      return res.status(401).json({ msg: "error invalid credentials" });
    }

    const tokenPayload = {
      creatorid: creator._id,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET_CREATOR);

    return res.status(200).json({ msg: "signin successful!", token: token });
  } catch (e) {
    console.log(`err: ${e}`);
    return res.status(500).json({ msg: "internal server error" });
  }
});

creatorRouter.post("/course", creatorAuth, async (req, res) => {
  const creatorid = req.body.creatorid;

  const { title, description, imageurl, price } = req.body;
  const courseData = {
    title,
    description,
    imageurl,
    price,
  };

  const courseDataValidation = z.object({
    title: z
      .string()
      .min(5, "title cannot be smaller than 5 characters")
      .max(50, "title cannot be longer than 20 characters"),
    description: z
      .string()
      .min(10, "description must be at least 10 characters long")
      .max(300, "description cannot be longer than 300 characters"),
    imageurl: z.string().url(),
    price: z.number(),
  });

  const validCourseData = courseDataValidation.safeParse(courseData);

  if (!validCourseData.success) {
    return res.status(400).json({
      msg: validCourseData.error.issues[0].message,
    });
  }

  try {
    await CourseModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      description: description,
      price: price,
      imageUrl: imageurl,
      creatorid: creatorid,
    });

    return res.status(201).json({
      msg: "new course created successfully",
    });
  } catch (e) {
    console.log(`error in creating new course: ${e}`);
    return res.status(500).json({
      msg: "internal server error while creating the course",
    });
  }
});

creatorRouter.patch("/course", creatorAuth, async (req, res) => {
  const creatorid = req.body.creatorid;

  const { title, description, imageurl, price, courseId } = req.body;
  const courseUpdateData = {
    title,
    description,
    imageurl,
    price,
    courseId,
  };

  const courseUpdateDataValidation = z.object({
    title: z
      .string()
      .min(5, "title cannot be smaller than 5 characters")
      .max(20, "title cannot be longer than 20 characters"),
    description: z
      .string()
      .min(10, "description must be at least 10 characters long")
      .max(300, "description cannot be longer than 300 characters"),
    imageurl: z.string().url(),
    price: z.number(),
    courseId: z.string(),
  });

  const validCourseData =
    courseUpdateDataValidation.safeParse(courseUpdateData);

  if (!validCourseData.success) {
    return res.status(400).json({
      msg: validCourseData.error.issues[0].message,
    });
  }

  try {
    const course = await CourseModel.findOne({
      _id: courseId,
      creatorid: creatorid,
    });

    if (!course) {
      return res.status(404).json({
        msg: "course does not exists",
      });
    }

    await CourseModel.updateOne(
      {
        _id: courseId,
        creatorid: creatorid,
      },
      {
        title: title,
        description: description,
        price: price,
        imageUrl: imageurl,
      },
    );

    return res.status(201).json({
      msg: "course updated successfully",
    });
  } catch (e) {
    console.log(`error in updating course: ${e}`);
    return res.status(500).json({
      msg: "internal server error while updating the course",
    });
  }
});

// TODO: returns all the courses the creator has
creatorRouter.get("/course/bulk", creatorAuth, (req, res) => {
  const creatorid = req.body.creatorid;

  try {
    console.log(creatorid);
    const courses = CourseModel.find({
      creatorid: creatorid,
    });

    return res.status(200).json({
      msg: "successfully fetched all courses",
      courses: courses,
    });
  } catch (e) {
    console.log(`error fetching courses for creator: ${e}`);

    return res.status(500).json({
      msg: "internal server error while fetching courses",
    });
  }
});

export { creatorRouter };
