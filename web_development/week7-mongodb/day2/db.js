const { Schema, ObjectId, model } = require("mongoose");

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userId: ObjectId,
  title: String,
  done: Boolean,
});

const UserModel = model("users", User);
const TodoModel = model("todos", Todo);

module.exports = {
  UserModel,
  TodoModel,
};
