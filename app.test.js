const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });
});

describe("App", () => {
  it("GET / should respond with Welcome to my homepage", async () => {
    const response = await request(app).get("/").expect(200);
    expect(response.text).toEqual("Welcome to my homepage");
  });
});

describe("Name of the group", () => {
  it("GET /mockDB/songs/:id should return the correct song", async () => {
    const expectedSong = { name: "newSongName", artist: "newSongArtist" };

    const { body: actualSong } = await request(app)
      .get("/mockDB/songs/1")
      .expect(200);

    expect(actualSong).toMatchObject(expectedSong);
  });
});

describe("Get /mockDB/fail", () => {
  it("Should return 500 error when server is down", async () => {
    const response = await request(app).get("/mockDB/fail").expect(500);
  });
});
