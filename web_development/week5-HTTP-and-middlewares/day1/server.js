const express = require("express");
const app = express();
const PORT = 3001;

app.get("/add", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  if (a && b) {
    res.status(200).send(JSON.stringify(parseInt(a) + parseInt(b)));
    return;
  }
  res.status(400).send("queryparams not provided!");
});

app.get("/subtract", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  console.log(a, b);
  if (a && b) {
    res.status(200).send(JSON.stringify(parseInt(a) - parseInt(b)));
    return;
  }
  res.status(400).send("queryparams not provided!");
});

app.get("/multiply", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  if (a && b) {
    res.status(200).send(JSON.stringify(parseInt(a) * parseInt(b)));
    return;
  }
  res.status(400).send("queryparams not provided!");
});

app.get("/divide", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  if (a && b) {
    res.status(200).send(JSON.stringify(parseInt(a) / parseInt(b)));
    return;
  }
  res.status(400).send("queryparams not provided!");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
