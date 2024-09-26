import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET_USER = process.env.JWT_SECRET_USER!;
const JWT_SECRET_CREATOR = process.env.JWT_SECRET_CREATOR!;

export { JWT_SECRET_CREATOR, JWT_SECRET_USER };
