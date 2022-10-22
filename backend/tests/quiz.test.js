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

describe("Create Quizzes",()=>{
    it("Should be able to create a new quiz", async () => {
        const response = await request(app)
        .post("/quiz")
        .set("Authorization", `bearer ${token}`)
        .send({
            description: "Quiz 1",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("quiz");

    });

    it("Should not be able to create a new quiz with an empty description", async () => {
        const response = await request(app)
        .post("/quiz")
        .set("Authorization", `bearer ${token}`)
        .send({
            description: "",
        });
        expect(response.status).toBe(400);
        
    });

    it("Should be able to get all quizzes", async () => {
        const response = await request(app)
        .get("/quiz")
        .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("quizzes");
    });

    it("Should be able to get a quiz by id", async () => {
        const createdQuizResponse = await request(app)
        .post("/quiz")
        .set("Authorization", `bearer ${token}`)
        .send({
            description: "Quiz 1",
        });
        const quizId = createdQuizResponse.body.quiz._id;

        const response = await request(app)
        .get(`/quiz/${quizId}`)
        .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("quiz");
    }
    );

   
});

describe("Update Quizzes",()=>{
    it("Should be able to update a quiz", async () => {
        const createdQuizResponse = await request(app)
        .post("/quiz")
        .set("Authorization", `bearer ${token}`)
        .send({
            description: "Quiz 1",
        });
        const quizId = createdQuizResponse.body.quiz._id;

        const response = await request(app)
        .put(`/quiz/${quizId}`)
        .set("Authorization", `bearer ${token}`)
        .send({
            description: "Quiz 2",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("quiz");
        expect(response.body.quiz.description).toBe("Quiz 2");
    }
    );
});
