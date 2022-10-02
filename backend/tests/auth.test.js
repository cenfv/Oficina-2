const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

beforeAll(async () => {
  await MongoMemoryServer.connect();
  await request(app).post("/user").send({
    firstName: "Carlos Eduardo",
    lastName: "Nogueira de Freitas Veiga",
    email: "carlosnfreitasv@gmail.com",
    password: "werty2510",
    gender: "outro",
  });
});

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("User auth", () => {
  it("Should be authenticate an user", async () => {
    const response = await request(app).post("/auth").send({
      email: "carlosnfreitasv@gmail.com",
      password: "werty2510",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });
  it("Should not be authenticate an user with wrong password", async () => {
    const response = await request(app).post("/auth").send({
      email: "carlosnfreitasv@gmail.com",
      password: "teste12345",
    });
    expect(response.status).toBe(404);
    
  });

  describe("Get user with token", () => {
    it("Should be able to get user with token", async () => {
      const response = await request(app)
        .get("/auth")
        .set("Authorization", `bearer ${token}`)
        .send({
          email: "carlosnfreitasv@gmail.com",
          password: "werty2510",
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
    });
  });
});
