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

  it("Password should not be able to have less than 6 characters", async () => {
    const response = await request(app).post("/user").send({
      firstName: "Senha",
      lastName: "Teste senha",
      email: "senha@gmail.com",
      password: "12345",
      gender: "outro",
    });
    expect(response.status).toBe(400);
  });

  it("Should not be able to create a new user with invalid email", async () => {
    const response = await request(app).post("/user").send({
      firstName: "Carlos Eduardo",
      lastName: "Nogueira de Freitas Veiga",
      email: "carlosnfreitav",
      password: "werty251",
      gender: "outro",
    });
    expect(response.status).toBe(400);
  });

  describe("Create user with empty Fields", () => {
    it("Should not be able to create a new user with empty firstName", async () => {
      const response = await request(app).post("/user").send({
        firstName: "",
        lastName: "Nogueira de Freitas Veiga",
        email: "nomevazio@email.com",
        password: "werty2510",
        gender: "outro",
      });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new user with empty lastName", async () => {
      const response = await request(app).post("/user").send({
        firstName: "Carlos Eduardo",
        lastName: "",
        email: "sobrenomevazio@email.com",
        password: "werty2510",
        gender: "outro",
      });
      expect(response.status).toBe(400);
    });
   
    it("Should not be able to create a new user with empty email", async () => {
      const response = await request(app).post("/user").send({
        firstName: "Carlos Eduardo",
        lastName: "Nogueira de Freitas Veiga",
        email: "",
        password: "werty2510",
        gender: "outro",
      });
      expect(response.status).toBe(400);
    });
    
    it("Should not be able to create a new user with empty password", async () => {
      const response = await request(app).post("/user").send({
        firstName: "Carlos Eduardo",
        lastName: "Nogueira de Freitas Veiga",
        email: "senhavazia@email.com",
        password: "",
        gender: "outro",
      });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new user with empty gender", async () => {
      const response = await request(app).post("/user").send({
        firstName: "Carlos Eduardo",
        lastName: "Nogueira de Freitas Veiga",
        email: "senhavazia@email.com",
        password: "werty123",
        gender: "",
      });
      expect(response.status).toBe(400);
    });
  });
});
