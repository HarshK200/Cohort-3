const express = require("express");
const app = express();


app.use( "/user/:id", checkUser)

// middleware
function checkUser(req, res, next) {
  console.log("From middleware: ", req.params)
  next()
}


app.get("/:id", (req, res) => {
  const id = req.params
  console.log("From get request: ", id)

  return res.status(200).send("test")
})


app.get("/user", (req, res) => {
  const id = req.params
  console.log("From get request: ", id)

  return res.status(200).send("test")
})


app.listen(3000, () => {console.log("listening")})
