const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

beforeAll(async () => await MongoMemoryServer.connect());

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("Create user", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/user").send({
      firstName: "Carlos Eduardo",
      lastName: "Nogueira de Freitas Veiga",
      email: "carlosnfreitav@gmail.com",
      password: "werty2510",
      gender: "outro",
    });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user._id");
  });

  it("Should not be able to create a new user with same email ", async () => {
    const response = await request(app).post("/user").send({
      firstName: "Carlos Eduardo",
      lastName: "Nogueira de Freitas Veiga",
      email: "carlosnfreitav@gmail.com",
      password: "werty2510",
      gender: "outro",
    });
    expect(response.status).toBe(400);
  });
});
