import express from "express";
import { UserModel, UserRole } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const creatorRouter = express.Router();

// WARN: No signup route since the admins will be provided as an env variable

creatorRouter.post("/signup", (req, res) => {
});

creatorRouter.post("/signin", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.headers;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        msg: "all fields required",
      });
    }

    const user = await UserModel.findOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        msg: "user not found, please signup",
      });
    }

    const passCorrect = await bcrypt.compare(
      password! as string,
      user.password,
    );
    if (!passCorrect) {
      return res.status(401).json({
        msg: "incorrect password",
      });
    }

    if (user.role !== UserRole.CREATOR) {
      return res.status(403).json({
        msg: "provided email is not registered as creator either login as user or register as a creator",
      });
    }

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
    );

    return res.status(200).json({
      msg: "signin successful",
      token,
    });
  } catch (e) {
    console.log(`creator signin error: ${e}`);
    return res.status(500);
  }
});

// NOTE: route for creating a new course
creatorRouter.post("/course", () => {});

// NOTE: route for updating the course
creatorRouter.patch("/course", () => {});

// NOTE: returns all the courses the admin has
creatorRouter.get("/course/bulk", () => {});

export { creatorRouter };
