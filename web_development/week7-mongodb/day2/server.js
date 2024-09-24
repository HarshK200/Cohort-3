const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth, JWT_SECRET } = require("./auth");
const { UserModel, TodoModel } = require("./db");
const { z } = require("zod");

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongoose connected!"));

const PORT = 3000;
const app = express();

app.use(express.json());

app.post("/signup", async function (req, res) {
  // HACK: To check if the password contains at least one Uppercase letter and so no.. you need to use z.refine((va) => regex.text(val))
  const requiredBody = z.object({
    name: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "invalid data", error: parsedData.error });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);

    await UserModel.create({
      name: name,
      email: email,
      password: hashed_password,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (e) {
    res.status(400).json({
      message: "Error user already exists",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  const isCorrectPass = bcrypt.compare(password, user.password);
  if (!isCorrectPass || !user) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    JWT_SECRET,
  );

  res.json({
    token,
  });
});

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
