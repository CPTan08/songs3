const express = require("express");
const app = express();
// app.use("/songs", songRouter);

const songRouter = require("./songs.route");

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

// this function simulates one asynchronous operation,
// e.g. loading user profile from database after 10ms
const newSong = {
  name: "newSongName",
  artist: "newSongArtist",
};

const loadSongsDB = (songID) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(newSong), 3000);
  });
};

const loadSongDBFailed = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Network Error")), 10);
  });
};

// the async function using async/await
const getSongById = async (req, res, next) => {
  const songID = req.params.id;

  try {
    const song = await loadSongsDB(songID);
    res.send(song);
  } catch (err) {
    next(err);
  }
};

// register the asynchronous handler function to a path
app.get("/mockDB/songs/:id", getSongById);

app.get("/mockDB/fail", async (req, res, next) => {
  try {
    const result = await loadSongDBFailed();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//default error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
