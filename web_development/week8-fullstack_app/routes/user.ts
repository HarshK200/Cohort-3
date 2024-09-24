import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, UserRole } from "../db";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || lastName || !email || !password) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  const existing_user = await UserModel.findOne({
    email: email,
  });
  if (existing_user) {
    return res
      .status(409)
      .json({ msg: "User with same email already exists please login" });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashed_password,
    role: UserRole.USER,
  });

  return res.status(200).json({ msg: "signup successful" });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json({ msg: "user with email not please signup" });
  }

  const pass_correct = await bcrypt.compare(password, user.password!);
  if (!pass_correct) {
    return res.status(401).json({ msg: "error invalid credentials" });
  }

  const tokenPayload = {
    userid: user.id,
    email: email,
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

  return res.status(200).json({ msg: "login successful!", token: token });
});

// NOTE: shows all the courses bought by the signed-in user
userRouter.get("/purchases", (_req, _res) => {});

export { userRouter };
