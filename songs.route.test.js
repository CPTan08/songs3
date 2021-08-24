const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

const songRouter = require("./songs.route");

app.use("/songs", songRouter); //mount router

//test post song
it("POST /songs should add a song and return a new song object", async () => {
  const newSong = { name: "Pink Moon", artist: "Nick Drake" };
  const response = await request(app).post("/songs").send(newSong).expect(201);

  expect(response.status).toEqual(201);
  expect(response.body).toMatchObject(newSong);
});

//test get song
it("GET /song/:id should return the correct song", async () => {
  const expectedSong = { name: "someSongName", artist: "someSongArtist" };

  const { body: actualSong } = await request(app).get("/songs/1").expect(200);

  expect(actualSong).toMatchObject(expectedSong);
});

//test put song
it("PUT /song/:id should return the new song", async () => {
  const updatedSong = { name: "updateSongName", artist: "updateSongArtist" };

  const { body: actualSong } = await request(app)
    .put("/songs/1")
    .send(updatedSong)
    .expect(200);
});

//test delete song

it("DELETE /song/:id should remove 2nd song", async () => {
  const deletedSong = {
    id: 2,
    name: "anotherSongName",
    artist: "anotherArtist",
  };

  const resp = await request(app).delete("/songs/2").expect(200);

  expect(resp.body).toMatchObject(deletedSong);
});

//test error handling
it("PUT Error handling when missing song id", async () => {
  const updatedSong = { name: "updateSongName", artist: "updateSongArtist" };
  const err = await request(app)
    .put("/songs/100")
    .send(updatedSong)
    .expect(400);
});
