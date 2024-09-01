const express = require("express");
const app = express();
const PORT = 3001;
const fs = require("node:fs");

let reqCount = 0;

function middleware(req, res, next) {
  console.log(`Request HTTP method: ${req.method}`);
  console.log(`Request url: ${req.url}`);
  console.log(`Request timestamp: ${new Date().toTimeString()}`);

  next();
}

function getHandler(req, res) {

  res.status(200).send("Hello there");
}

app.get("/add", middleware, getHandler);

app.listen(PORT, console.log(`port listening on port ${PORT}`));
