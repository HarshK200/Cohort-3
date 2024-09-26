import mongoose from "mongoose";

function connectToMongo() {
  return new Promise<boolean>(async (resolve, _reject) => {
    try {
      await mongoose.connect(process.env.MONGODB_URL!);
      console.log("mongoose connected!");
      resolve(true);
    } catch (e) {
      console.log(`couldn't connect to mongodb error: ${e}`);
      resolve(false);
    }
  });
}

const User = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Creator = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Course = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  creatorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creators",
    required: true,
  },
});

const Purchase = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  courseid: { type: mongoose.Types.ObjectId, ref: "courses", require: true },
  userid: { type: mongoose.Types.ObjectId, ref: "users", require: true },
});

const UserModel = mongoose.model("users", User);
const CreatorModel = mongoose.model("creators", Creator);
const CourseModel = mongoose.model("courses", Course);
const PurchaseModel = mongoose.model("purchases", Purchase);

export { UserModel, CreatorModel, CourseModel, PurchaseModel, connectToMongo };
