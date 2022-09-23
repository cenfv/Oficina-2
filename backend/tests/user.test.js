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
      email: "carlosnfreitasv@gmail.com",
      password: "werty2510",
      gender: "outro",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user._id");
  });

  it("Should not be able to create a new user with same email ", async () => {
    const response = await request(app).post("/user").send({
      firstName: "Carlos Eduardo",
      lastName: "Nogueira de Freitas Veiga",
      email: "carlosnfreitasv@gmail.com",
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

describe("Authorized user operations", () => {
  let userToken;
  let userId;

  describe("Auth user", () => {
    it("Should be able to auth user", async () => {
      const response = await request(app).post("/auth").send({
        email: "carlosnfreitasv@gmail.com",
        password: "werty2510",
      });

      userToken = response.body.token;
      userId = response.body.user._id;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("Should not be able to auth user with invalid credentials", async () => {
      const response = await request(app).post("/auth").send({
        email: "carlosnfreitasv2",
        password: "werty2510",
      });
      expect(response.status).toBe(404);
    });
  });

  describe("Update user", () => {
    it("Should be able to update a user", async () => {
      const response = await request(app)
        .put(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}`)
        .send({
          firstName: "Carlos Eduardo",
          lastName: "Veiga",
          email: "carlosnfreitasv@gmail.com",
          password: "werty2510",
          gender: "Masculino",
        });
      expect(response.status).toBe(200);
    });

    it("Should not be able to update a user with invalid token", async () => {
      const response = await request(app)
        .put(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}123`)
        .send({
          firstName: "Carlos Eduardo",
          lastName: "Veiga",
          email: "carlosnfreitasv@gmail.com",
          password: "werty2510",
          gender: "masculino",
        });
      expect(response.status).toBe(400);
    });
  });

  describe("Delete user", () => {
    it("Should be able to delete a user", async () => {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}`);
      expect(response.status).toBe(200);
    });

    it("Should not be able to delete a user with invalid token", async () => {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}`);
      expect(response.status).toBe(400);
    });
  });
});
