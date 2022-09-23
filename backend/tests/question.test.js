const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";

beforeAll(async () => {
  await MongoMemoryServer.connect();
  response = await request(app).post("/user").send({
    firstName: "Carlos Eduardo",
    lastName: "Nogueira de Freitas Veiga",
    email: "carlosnfreitasv@gmail.com",
    password: "werty2510",
    gender: "outro",
  });

  token = response.body.token;
});

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("Create question", () => {
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

  describe("Create question with invalid types", () => {
    it("Should not be able to create a new question with invalid editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: "dois mil e vinte e um",
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

  describe("Create question with invalid values", () => {
    it("Should not be able to create a new question with invalid editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Criar questao",
          description: "devo criar uma questão",
          editionYear: 0,
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
          difficulty: 0,
          imageUrl: "",
        });
      expect(response.status).toBe(400);
    });
  });
});
