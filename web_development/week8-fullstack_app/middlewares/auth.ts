import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_SECRET_CREATOR, JWT_SECRET_USER } from "../config";

function userAuth(req: Request, res: Response, next: any) {
  const token = req.cookies["jwt_token"];
  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  if (!JWT_SECRET_USER) {
    console.log("Err: JWT_SECRET_USER env not provided!");
    return res.status(500).json({ msg: "internal server error!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET_USER) as jwt.JwtPayload;

    req.body.userid = verified.userid;

    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

function creatorAuth(req: Request, res: Response, next: any) {
  const token = req.cookies["jwt_token"];

  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  if (!JWT_SECRET_CREATOR) {
    console.log("Err: JWT_SECRET_CREATOR env not provided!");
    return res.status(500).json({ msg: "internal server error!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET_CREATOR) as jwt.JwtPayload;

    req.body.creatorid = verified.creatorid;

    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

export { userAuth, creatorAuth };
