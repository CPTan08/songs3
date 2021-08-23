const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
typeof express.json(); // 'function'

const songs = [
  {
    id: 1,

    name: "someSongName",
    artist: "someSongArtist",
  },
  {
    id: 2,

    name: "anotherSongName",
    artist: "anotherArtist",
  },
];

app.get("/songs", (req, res) => {
  res.status(201).send(songs);
});

app.get("/song/:id", (req, res) => {
  let id = parseInt(req.params.id);

  console.log(id);

  console.log(songs);

  res.send(songs.filter((song) => (id ? id === song.id : true)));
  //   .filter((item) => (req.query.type ? req.query.type === item.type : true))
});

app.post("/songs", (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  console.log(req.body);

  songs.push(newSong);
  res.status(201).send(newSong);
});

app.put("/song/:id", (req, res) => {
  let newSongInfo = {
    id: req.params.id,
    name: req.body.name,
    artist: req.body.artist,
  };
  console.log(req.body);
  const songToUpdate = songs.find(
    (song) => song.id === parseInt(req.params.id)
  );

  songToUpdate.name="req.body.name";
  songToUpdate.name="req.body.name";
   res.status(200).send(newSongInfo);
});

app.delete("/songs/:id", (req, res) => {
  console.log(req.params.id);
  const songToDelete = songs.find(
    (song) => song.id === parseInt(req.params.id)
  );

  //error handling here

  const indexToDelete = songs.indexOf(songToDelete);

  songs.splice(indexToDelete, 1);

  res.status(200).send(songToDelete);
});
module.exports = app;
