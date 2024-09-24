const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //TODO: authentication logic
  const { token } = req.headers;
  if (!token) {
    return res
      .status(403)
      .json({ msg: "authentication token not provided. Please login/signup" });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const verified = jwt.verify(token, JWT_SECRET);
    req.body.username = verified.username;
    next();
  } catch (e) {
    return res
      .status(403)
      .json({ msg: "invalid authentication token. please login/signup again" });
  }
}

module.exports = { auth };
