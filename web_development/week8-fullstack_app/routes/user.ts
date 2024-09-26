import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../db";
import mongoose from "mongoose";
import { z } from "zod";
import { JWT_SECRET_USER } from "../config";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
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
    });

    return res.status(201).json({ msg: "signup successful" });
  } catch (e) {
    console.log(`error during creating new user in db: ${e}`);
    return res
      .status(500)
      .json({ msg: "internal server error cannot register user" });
  }
});

userRouter.post("/signin", async (req, res) => {
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
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "user with email is not registered please signup" });
    }

    const pass_correct = await bcrypt.compare(password, user.password!);
    if (!pass_correct) {
      return res.status(401).json({ msg: "error invalid credentials" });
    }

    const tokenPayload = {
      userid: user._id,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET_USER);

    return res.status(200).json({ msg: "signin successful!", token: token });
  } catch (e) {
    console.log(`err: ${e}`);
    return res.status(500).json({ msg: "internal server error" });
  }
});

// TODO: shows all the courses bought by the signed-in user
userRouter.get("/purchases", (_req, _res) => {});

export { userRouter };
