const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

let token = "";
let createdSubmissionID;


beforeAll(async () => {
    await MongoMemoryServer.connect();
    userResponse = await request(app).post("/user").send({
        firstName: "Carlos Eduardo",
        lastName: "Nogueira de Freitas Veiga",
        email: "carlosnfreitasv@gmail.com",
        password: "werty2510",
        gender: "outro",
    });

    userID = userResponse.body.user._id;

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

    const questionAlternativeResponse = await request(app)
        .post("/question-alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
            question: questionId,
            alternative: alternativeId,
            correctAlternative: alternativeId.at(0),
        });

    questionAlternativeID = questionAlternativeResponse.body.questionAlternative._id;
});

afterAll(async () => await MongoMemoryServer.closeDatabase());

describe("Create submissions", () => {
    it("Should create a submission", async () => {
        const response = await request(app)
            .post(`/submission/${questionAlternativeID}`)
            .set("Authorization", `bearer ${token}`)
            .send({
                choice: alternativeId.at(0),
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("submission");
        createdSubmissionID = response.body.submission._id;

    });

    it("Shoul get created submission by id", async () => {
        const response = await request(app)
            .get(`/submission/${createdSubmissionID}`)
            .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("submission._id");
    });

    it("Should get created submissions", async () => {
        const response = await request(app)
            .get(`/submission`)
            .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("submission[0]._id");
    });

    it("Should get created submissions by user id", async () => {
        const response = await request(app)
            .get(`/submission/user/${userID}?page=1&limit=10`)
            .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("submission[0].data[0]._id");
    });

})

describe("User statistics", () => {
    it("Should get user statistics", async () => {
        const response = await request(app)
            .get(`/submission/user/${userID}/statistics`)
            .set("Authorization", `bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("statistics.progressRate");
        expect(response.body.statistics.progressRate).toBe(100); // para verificar se o progresso é 100%
        expect(response.body.statistics.correctSubmissionRate).toBe(100); // para verificar se a taxa de acerto é 100%
        expect(response.body.statistics.solvedQuantity).toBe(1); // para verificar se a quantidade de questões resolvidas é 1
        expect(response.body.statistics.remainingQuestions).toBe(0); // para verificar se a quantidade de questões restantes é 0
    });

    it("Should get user statistics after create a new submission with wrong answer", async () => {

        const response = await request(app)
            .post(`/submission/${questionAlternativeID}`)
            .set("Authorization", `bearer ${token}`)
            .send({
                choice: alternativeId.at(1),
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("submission");
        createdSubmissionID = response.body.submission._id;

        const statisticsResponse = await request(app)
            .get(`/submission/user/${userID}/statistics`)
            .set("Authorization", `bearer ${token}`);
        expect(statisticsResponse.status).toBe(200);
        expect(statisticsResponse.body).toHaveProperty("statistics.progressRate");
        expect(statisticsResponse.body.statistics.progressRate).toBe(100); // para verificar se o progresso é 100%
        expect(statisticsResponse.body.statistics.correctSubmissionRate).toBe(50); // para verificar se a taxa de acerto é 50%
        expect(statisticsResponse.body.statistics.solvedQuantity).toBe(1); // para verificar se a quantidade de questões resolvidas é 1, apesar de ser outra submissão, ainda é a mesma questão
        expect(statisticsResponse.body.statistics.remainingQuestions).toBe(0); // para verificar se a quantidade de questões restantes é 0
    });

    it("Should get user statistics after create a new submission with correct answer", async () => {
            const response = await request(app)
                .post(`/submission/${questionAlternativeID}`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    choice: alternativeId.at(0),
                });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("submission");
            createdSubmissionID = response.body.submission._id;
    
            const statisticsResponse = await request(app)
                .get(`/submission/user/${userID}/statistics`)
                .set("Authorization", `bearer ${token}`);
            expect(statisticsResponse.status).toBe(200);
            expect(statisticsResponse.body).toHaveProperty("statistics.progressRate");
            expect(statisticsResponse.body.statistics.progressRate).toBe(100); // para verificar se o progresso é 100%
            expect(statisticsResponse.body.statistics.correctSubmissionRate).toBeCloseTo(66.66, 1) // para verificar se a taxa de acerto é 66%
            expect(statisticsResponse.body.statistics.solvedQuantity).toBe(1); // para verificar se a quantidade de questões resolvidas é 1
            expect(statisticsResponse.body.statistics.remainingQuestions).toBe(0); // para verificar se a quantidade de questões restantes é 0
        });
});