import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "Hi you've hit the http express js server for chatapp",
  });
});

app.listen(6969, () => {
  console.log("server running on port 6969");
});
