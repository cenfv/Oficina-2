const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";
let questionId = "";
let alternativeId = "";

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

  const questionResponse = await request(app)
    .post("/question")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Questão numero 1",
      description: "questao das bananas",
      difficulty: 0,
      editionYear: 2017,
    });
  questionId = questionResponse.body.question._id;

  const alternativeResponse = await request(app)
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
  alternativeId = alternativeResponse.body.alternative.map(
    (alternative) => alternative._id
  );
});

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("Create question-alternative", () => {
  it("Should be able to create a new question-alternative", async () => {
    const response = await request(app)
      .post("/question-alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        question: questionId,
        alternative: alternativeId,
        correctAlternative: alternativeId.at(0),
      });
    expect(response.status).toBe(201);
  });

  describe("Create question-alternative with empty Fields", () => {
    it("Should not be able to create a new question-alternative with empty question", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: "",
          alternative: alternativeId,
          correctAlternative: alternativeId.at(0),
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question-alternative with empty alternative", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: questionId,
          alternative: "",
          correctAlternative: alternativeId.at(0),
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question-alternative with empty correctAlternative", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: questionId,
          alternative: alternativeId,
          correctAlternative: "",
        });
      expect(response.status).toBe(400);
    });
  });

  describe("Create question-alternative with invalid Fields", () => {
    it("Should not be able to create a new question-alternative with invalid question", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: "123",
          alternative: alternativeId,
          correctAlternative: alternativeId.at(0),
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question-alternative with invalid alternative", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: questionId,
          alternative: "123",
          correctAlternative: alternativeId.at(0),
        });
      expect(response.status).toBe(400);
    });

    it("Should not be able to create a new question-alternative with invalid correctAlternative", async () => {
      const response = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          question: questionId,
          alternative: alternativeId,
          correctAlternative: "123",
        });
      expect(response.status).toBe(400);
    });
  });
});
