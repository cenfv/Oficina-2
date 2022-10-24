const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";
let questionId = "";
let alternativeId = "";
let alternatives;
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

  const questionResponse = await request(app)
    .post("/question")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Questão numero 1",
      description: "questao das bananas",
      difficulty: 0,
      editionYear: 2017,
      quiz: quiz,
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
  alternatives = alternativeResponse.body.alternatives;
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

    let questionAlternativeId = response.body.questionAlternative._id;

    const questionAlternativeResponse = await request(app).get(`/question-alternative/${questionAlternativeId}`).set("Authorization", `bearer ${token}`);

    expect(questionAlternativeResponse.status).toBe(200);
    expect(questionAlternativeResponse.body).toHaveProperty("questionAlternative.question");
    expect(questionAlternativeResponse.body).toHaveProperty("questionAlternative.alternative");

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

      const questionAlternativeResponse = await request(app).get(`/question-alternative`).set("Authorization", `bearer ${token}`);

      let count = 0;
      questionAlternativeResponse.body.questionAlternative.forEach((questionAlternative) => questionAlternative.question === "" && count++);
      expect(count).toBe(0);
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

      const questionAlternativeResponse = await request(app).get(`/question-alternative`).set("Authorization", `bearer ${token}`);

      let count = 0;
      questionAlternativeResponse.body.questionAlternative.forEach((questionAlternative) => questionAlternative.alternative === "" && count++);
      expect(count).toBe(0);
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

      // pensar no teste posteriormente, já que não podemos retornar o valor da alternativa correta
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

      const questionAlternativeResponse = await request(app).get(`/question-alternative`).set("Authorization", `bearer ${token}`);

      let count = 0;
      questionAlternativeResponse.body.questionAlternative.forEach((questionAlternative) => questionAlternative.question === "123" && count++);
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

      const questionAlternativeResponse = await request(app).get(`/question-alternative`).set("Authorization", `bearer ${token}`);

      let count = 0;
      questionAlternativeResponse.body.questionAlternative.forEach((questionAlternative) => questionAlternative.alternative === "123" && count++);

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
      // pensar no teste posteriormente, já que não podemos retornar o valor da alternativa correta
    });
  }); 
});

describe("Update question-alternative", () => {
  it("Should be able to update a question-alternative", async () => {

    const response = await request(app)
      .post("/question-alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        question: questionId,
        alternative: alternativeId,
        correctAlternative: alternativeId.at(0),
      });

    let questionAlternativeId = response.body.questionAlternative._id;
   
    
    const updateResponse = await request(app)
      .put(`/question-alternative/${questionAlternativeId}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        question: questionId,
        alternative: alternativeId,
        correctAlternative: alternativeId.at(1),
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("questionAlternative.question");
    expect(updateResponse.body).toHaveProperty("questionAlternative.alternative");
    expect(updateResponse.body.questionAlternative.correctAlternative.at(0)).toBe(alternativeId.at(1));
  });
});

describe("Delete question-alternative", () => {
  it("Should be able to delete a question-alternative", async () => {
    const response = await request(app)
      .post("/question-alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        question: questionId,
        alternative: alternativeId,
        correctAlternative: alternativeId.at(0),
      });

    let questionAlternativeId = response.body.questionAlternative._id;

    const deleteResponse = await request(app).delete(`/question-alternative/${questionAlternativeId}`).set("Authorization", `bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
  });
});