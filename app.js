const express = require("express");
const app = express();
// app.use("/songs", songRouter);

const songRouter = require("./songs.route");

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
