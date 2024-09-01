const express = require("express");
const app = express();
const PORT = 3001;

let reqCount = 0;

function requestCounter(req, res, next) {
  reqCount += 1;
  console.log(`Total no. of requests: ${reqCount}`);

  req.msg = "user is older enough for maths";
  let a = parseInt(req.query.a);
  if (a < 18) {
    res.json({
      msg: "you are too young for maths ending the the req-res cycle",
    });
    return;
  }

  next();
}

function additionHandler(req, res) {
  console.log(req.msg);
  const a = req.query.a;
  const b = req.query.b;
  if (a && b) {
    res.status(200).send(JSON.stringify(parseInt(a) + parseInt(b)));
    return;
  }
  res.status(400).send("queryparams not provided!");
}

app.get("/add", requestCounter, additionHandler);

app.listen(PORT, console.log(`port listening on port ${PORT}`));
