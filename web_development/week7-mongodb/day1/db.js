const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const Todo = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, ref: "users" },
  title: String,
  description: String,
  done: Boolean,
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = { UserModel, TodoModel };
