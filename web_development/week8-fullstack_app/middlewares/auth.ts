import jwt from "jsonwebtoken";

export default function auth(req: any, res: any, next: any) {
  //TODO: authentication logic
  const { token }: { token: string } = req.headers;
  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  // HACK: DO A LITTLE BETTER ERROR HANDLING (edgecase: JWT_SECRET is not correct i.e. a server err user still gets 403 bad req)
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
