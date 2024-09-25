import express from "express";
import { CourseModel, UserModel, UserRole } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import mongoose from "mongoose";

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

  const existing_user = await UserModel.findOne({
    email: email,
  });
  if (existing_user) {
    return res
      .status(409)
      .json({ msg: "User with same email already exists please signin" });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password,
      role: UserRole.CREATOR,
    });

    return res.status(200).json({ msg: "signup successful" });
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
    const creator = await UserModel.findOne({
      email: email,
      role: UserRole.CREATOR,
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
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_CREATOR!);

    return res.status(200).json({ msg: "signin successful!", token: token });
  } catch (e) {
    console.log(`err: ${e}`);
    return res.status(500).json({ msg: "internal server error" });
  }
});

// TODO: route to creating a new course
creatorRouter.post("/course", async (req, res) => {
  const creatorid = req.body.creatorid;

  const { title, description, imageurl, price } = req.body;

  const course = await CourseModel.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageurl,
    creatorid: creatorid,
  });
});

// TODO: route for updating the course
creatorRouter.patch("/course", () => {});

// TODO: returns all the courses the admin has
creatorRouter.get("/course/bulk", () => {});

export { creatorRouter };
