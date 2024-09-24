import jwt from "jsonwebtoken";
import { Request, Response } from "express";

function userAuth(req: Request, res: Response, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1]; // NOTE: assuming the authorization header has bearer attached to it
  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  // WARN: DO A LITTLE BETTER ERROR HANDLING (edgecase: JWT_SECRET is not correct i.e. a server err user still gets 403 bad req)
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const verified = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    req.body.userid = verified.userid;
    req.body.email = verified.email;

    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

function creatorAuth(req: Request, res: Response, next: any) {
  // TODO: authentication logic for creatorAuth
}

export { userAuth, creatorAuth };
