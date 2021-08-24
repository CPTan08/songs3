const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });
});

// describe("App", () => {
//   it("GET / should respond with Welcome to my homepage", async () => {
//     const response = await request(app).get("/").expect(200);
//     expect(response.text).toEqual("Welcome to my homepage");
//   });
// });

it("should respond correctly", async () => {
  const { text } = await request(app).get("/").expect(200);
  expect(text).toEqual("Welcome to my homepage");
});

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

  const { body: actualSong } = await request(app).get("/song/1").expect(200);

  expect(actualSong).toMatchObject(expectedSong);
});
