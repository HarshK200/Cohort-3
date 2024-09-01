const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/add", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({ sum: a + b });
});

app.listen(3001, () => {
  console.log("app listening on 3001");
});
