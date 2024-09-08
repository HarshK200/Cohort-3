import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express();
const PORT = 3000;
const JWT_SECRET = "MYSECERT";

// setting up middlewares
app.use(cookieParser());
app.use(cors()); // for cross origin data tranfer stuff
app.use(json()); // for automatically parsing the data the we get from the front end

interface User {
  username: string;
  password: string;
  token?: string;
}

const USERS: User[] = [];

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const userExists = USERS.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ err: "user already exists please login" });
  }

  const newUser: User = {
    username: username,
    password: password,
  };

  USERS.push(newUser);

  res.status(200).json({
    success: true,
    msg: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = USERS.find(
    (user) => user.username === username && user.password === password,
  );

  // when user doesn't exists in the db
  if (!user) {
    return res.status(400).json({
      err: "invalid credentials",
    });
  }

  const token = jwt.sign(user, JWT_SECRET);
  user.token = token;
  res.status(200).json({
    token: token,
  });
  console.log(user);
});

// authentication middleware
function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token: any = req.headers.token;
  if (!token)
    return res
      .status(400)
      .json({ err: "invalid credentials! try logging in again" });

  const user = jwt.verify(token, JWT_SECRET) as User;

  if (!user) {
    return res.status(400).json({ err: "Invalid credentials" });
  }

  const foundUser = USERS.find(
    (x) => x.username === user.username && x.password === user.password,
  );
  if (!foundUser) {
    return res.status(404).json({ err: "user not registered! please signup" });
  }

  req.body.user = user;
  next();
}

app.get("/me", auth, (req, res) => {
  const user: User = req.body.user;

  res
    .status(200)
    .json({ success: true, username: user.username, password: user.password });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
