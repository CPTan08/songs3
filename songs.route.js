const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.status(201).send(songs);
});

router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);

  const filter = songs.filter((song) => (id ? id === song.id : true));
  res.send(filter[0]);
});

router.post("/", (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  console.log(req.body);

  songs.push(newSong);
  res.status(201).send(newSong);
});

router.put("/:id", (req, res, next) => {
  let resultIndex = songs.findIndex(
    (song) => song.id === parseInt(req.params.id)
  );

  //error handling for put
  if (resultIndex === -1) {
    const err = new Error("Invalid Id");

    // console.log(err);
    err.statusCode = 400;
    next(err);
  }
  let newSongInfo = {
    id: req.params.id,
    name: req.body.name,
    artist: req.body.artist,
  };

  console.log(req.body);
  const songToUpdate = songs.find(
    (song) => song.id === parseInt(req.params.id)
  );

  songToUpdate.name = "req.body.name";
  songToUpdate.name = "req.body.name";
  res.status(200).send(newSongInfo);
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const songToDelete = songs.find(
    (song) => song.id === parseInt(req.params.id)
  );

  const indexToDelete = songs.indexOf(songToDelete);

  songs.splice(indexToDelete, 1);

  res.status(200).send(songToDelete);
});

//Handle Router error
router.use((err, req, res, next) => {
  if (err.statusCode === 400) res.status(err.statusCode).send(err.message);
  else next(err);
});

module.exports = router;
