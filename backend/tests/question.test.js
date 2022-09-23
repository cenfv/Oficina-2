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

describe("Create question", () => {
  it("Should be able to create a new question", async () => {
    const response = await request(app)
      .post("/question")
      .set("Authorization", `bearer ${token}`)
      .send({
        title: "Questão numero 1",
        description: "questao das bananas",
        difficulty: 0,
        editionYear: 2017,
      });
    expect(response.status).toBe(201);
  });

  describe("Create question with empty Fields", () => {
    it("Should not be able to create a new question with empty title", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "",
          description: "devo criar uma questão",
          editionYear: 2021,
          difficulty: 1,
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question with empty description", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "",
          editionYear: 2021,
          difficulty: 1,
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question with empty editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: "",
          difficulty: 1,
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question with empty difficulty", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: 2021,
          difficulty: "",
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });
  });

  describe("Create question with invalid values", () => {
    it("Should not be able to create a new question with invalid editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: "a",
          difficulty: 1,
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question with invalid difficulty", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: 2021,
          difficulty: "dificuldade",
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });
  });
});
