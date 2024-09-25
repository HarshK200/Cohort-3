import jwt from "jsonwebtoken";
import { Request, Response } from "express";

function userAuth(req: Request, res: Response, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1]; // NOTE: assuming the authorization header has bearer attached to it
  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  const JWT_SECRET = process.env.JWT_SECRET_USER;
  if (!JWT_SECRET) {
    console.log("Err: JWT_SECRET_USER env not provided!");
    return res.status(500).json({ msg: "internal server error!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    req.body.userid = verified.userid;

    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

function creatorAuth(req: Request, res: Response, next: any) {
  // TODO: authentication logic for creatorAuth
  const token = req.headers["authorization"]?.split(" ")[1]; // NOTE: assuming the authorization header has bearer attached to it

  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  const JWT_SECRET = process.env.JWT_SECRET_CREATOR;
  if (!JWT_SECRET) {
    console.log("Err: JWT_SECRET env not provided!");
    return res.status(500).json({ msg: "internal server error!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    req.body.creatorid = verified.creatorid;

    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

export { userAuth, creatorAuth };
