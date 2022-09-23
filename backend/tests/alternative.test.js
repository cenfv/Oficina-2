const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";

beforeAll(async () => {
  await MongoMemoryServer.connect();
  await request(app).post("/user").send({
    firstName: "Carlos Eduardo",
    lastName: "Nogueira de Freitas Veiga",
    email: "carlosnfreitasv@gmail.com",
    password: "werty2510",
    gender: "outro",
  });
  const response = await request(app).post("/auth").send({
    email: "carlosnfreitasv@gmail.com",
    password: "werty2510",
  });
  token = response.body.token;
});

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("Create alternatives", () => {
  it("Should be able to create a new alternative", async () => {
    const response = await request(app)
      .post("/alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        alternatives: [{ description: "Alternativa 1" }],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("alternative");
  });
  it("Should be able to create more than one alternative", async () => {
    const response = await request(app)
      .post("/alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        alternatives: [
          { description: "Alternativa 1" },
          { description: "Alternativa 2" },
          { description: "Alternativa 3" },
          { description: "Alternativa 4" },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("alternative");
  });
  describe("Create alternatives with empty Fields", () => {
    it("Should not be able to create a new alternative with empty description", async () => {
      const response = await request(app)
        .post("/alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          alternatives: [
            { description: "Alternativa 1" },
            { description: "Alternativa 2" },
            { description: "" },
            { description: "Alternativa 4" },
          ],
        });
      expect(response.status).toBe(400);
    });
  });
});
