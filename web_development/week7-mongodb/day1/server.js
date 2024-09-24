const express = require("express");
const { auth } = require("./auth");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// middlewares
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("mongoose connected!");
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
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
    username: username,
    email: email,
    password: hashed_password,
  });

  return res.status(200).json({ msg: "signup successful" });
});

app.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  const user = await UserModel.findOne({
    username: username,
    email: email,
  });
  if (!user) {
    return res.status(404).json({ msg: "user with email not please signup" });
  }

  const pass_correct = await bcrypt.compare(password, user.password);
  if (!pass_correct) {
    return res.status(403).json({ msg: "error invalid credentials" });
  }

  const token = jwt.sign({ username: username, email: email }, JWT_SECRET);

  return res.status(200).json({ msg: "login successful!", token: token });
});

app.post("/todo", auth, (req, res) => {
  return res.status(200).json({ msg: "todo" });
});

app.get("/todos", auth, (req, res) => {
  return res.status(200).json({ msg: "todos" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
