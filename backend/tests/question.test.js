const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";
let quiz = "";
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

  const createdQuizResponse = await request(app)
    .post("/quiz")
    .set("Authorization", `bearer ${token}`)
    .send({
      description: "Quiz 1",
    });
  quiz = createdQuizResponse.body.quiz._id;
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
        quiz: quiz,
      });
    expect(response.status).toBe(201);

    let questionId = response.body.question._id;
    const questionResponse = await request(app).get(`/question/${questionId}`).set("Authorization", `bearer ${token}`);
    expect(questionResponse.status).toBe(200);
    expect(questionResponse.body).toHaveProperty("question.title");

  });

  describe("Create question with empty Fields", () => {
    it("Should not be able to create a new question with empty title", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "",
          description: "Questão com titulo vazio",
          editionYear: 2021,
          difficulty: 1,
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.description === "Questão com titulo vazio" && count++);
      expect(count).toBe(0);
    });

    it("Should not be able to create a new question with empty description", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Questão com descrição vazia",
          description: "",
          editionYear: 2021,
          difficulty: 1,
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.title === "Questão com descrição vazia" && count++);
      expect(count).toBe(0);
    });

    it("Should not be able to create a new question with empty editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Questão com data de edição vazia",
          description: "Questão com data de edição vazia",
          editionYear: "",
          difficulty: 1,
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.title === "Questão com data de edição vazia" && count++);
      expect(count).toBe(0);
    });

    it("Should not be able to create a new question with empty difficulty", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Questão com dificuldade vazia",
          description: "Questão com dificuldade vazia",
          editionYear: 2021,
          difficulty: "",
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.title === "Questão com dificuldade vazia" && count++);
      expect(count).toBe(0);
    });

  });

  describe("Create question with invalid values", () => {
    it("Should not be able to create a new question with invalid editionYear", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Questão com data de edição inválido",
          description: "Questão com data de edição inválido",
          editionYear: "a",
          difficulty: 1,
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.title === "Questão com data de edição inválido" && count++);
      expect(count).toBe(0);
    });

    it("Should not be able to create a new question with invalid difficulty", async () => {
      const response = await request(app)
        .post("/question")
        .set("Authorization", `bearer ${token}`)
        .send({
          title: "Questão com dificuldade inválida",
          description: "Questão com dificuldade inválida",
          editionYear: 2021,
          difficulty: "dificuldade",
          imageUrl: "",
          quiz: quiz,
        });
      expect(response.status).toBe(400);

      const questionResponse = await request(app).get(`/question`).set("Authorization", `bearer ${token}`);
      let count = 0;
      questionResponse.body.questions.forEach((question) => question.title === "Questão com dificuldade inválida" && count++);
      expect(count).toBe(0);
    });
  });
});

describe("Update question", () => {
  it("Should be able to update a question", async () => {
    const response = await request(app)
      .post("/question")
      .set("Authorization", `bearer ${token}`)
      .send({
        title: "Questão numero 1",
        description: "questao das bananas",
        difficulty: 0,
        editionYear: 2017,
        quiz: quiz,
      });
    const createdQuestionResponse = response.body.question._id;
    const updateResponse = await request(app)
      .put(`/question/${createdQuestionResponse}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        title: "Questão numero 2",
        description: "questao das laranjas",
        difficulty: 0,
        editionYear: 2017,
        quiz: quiz,
      });
    expect(updateResponse.status).toBe(200);
  });
});

describe("Delete question", () => {
  it("Should be able to delete a question", async () => {
    const response = await request(app)
      .post("/question")
      .set("Authorization", `bearer ${token}`)
      .send({
        title: "Questão numero 1",
        description: "questao das bananas",
        difficulty: 0,
        editionYear: 2017,
        quiz: quiz,
      });
    const createdQuestionResponse = response.body.question._id;
    const deleteResponse = await request(app)
      .delete(`/question/${createdQuestionResponse}`)
      .set("Authorization", `bearer ${token}`);
    expect(deleteResponse.status).toBe(200);
  });
});