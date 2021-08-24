const express = require("express");
const app = express();
// app.use("/songs", songRouter);

const songRouter = require("./songs.route");

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

module.exports = app;
