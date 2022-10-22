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

describe("Create alternatives", () => {
  it("Should be able to create a new alternative", async () => {
    const response = await request(app)
      .post("/alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        alternatives: [{ description: "Alternativa 1" }],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("alternative");

    let alternativeId = response.body.alternative.at(0)._id;

    const alternativeResponse = await request(app).get(`/alternative/${alternativeId}`).set("Authorization", `bearer ${token}`);
    expect(alternativeResponse.status).toBe(200);
    expect(alternativeResponse.body).toHaveProperty("alternative.description");

  });
  it("Should be able to create more than one alternative", async () => {
    const response = await request(app)
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
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("alternative");

    let alternativeId = response.body.alternative.at(0)._id;
    let alternativeId2 = response.body.alternative.at(1)._id;

    const alternativeResponse = await request(app).get(`/alternative/${alternativeId}`).set("Authorization", `bearer ${token}`);
    expect(alternativeResponse.status).toBe(200);
    expect(alternativeResponse.body).toHaveProperty("alternative.description");

    const alternativeResponse2 = await request(app).get(`/alternative/${alternativeId2}`).set("Authorization", `bearer ${token}`);
    expect(alternativeResponse2.status).toBe(200);
    expect(alternativeResponse2.body).toHaveProperty("alternative.description");
  });

  describe("Create alternatives with empty Fields", () => {
    it("Should not be able to create a new alternative with empty description", async () => {
      const response = await request(app)
        .post("/alternative")
        .set("Authorization", `bearer ${token}`)
        .send({
          alternatives: [
            { description: "Alternativa que não deve ser criada" },
            { description: "Alternativa que não deve ser criada" },
            { description: "" },
            { description: "Alternativa que não deve ser criada" },
          ],
        });
      expect(response.status).toBe(400);

      const alternativeResponse = await request(app).get(`/alternative`).set("Authorization", `bearer ${token}`);

      let count = 0;
      alternativeResponse.body.alternatives.forEach((alternative) => alternative.description === "Alternativa que não deve ser criada" && count++);
      expect(count).toBe(0);
    });
  });
});

describe("Update alternatives", () => {
  it("Should be able to update a alternative", async () => {
    const createdAlternative = await request(app)
      .post("/alternative")
      .set("Authorization", `bearer ${token}`)
      .send({
        alternatives: [{ description: "Alternativa 1" }],
      });

    let alternativeId = createdAlternative.body.alternative.at(0)._id;

    const response = await request(app)
      .put(`/alternative/${alternativeId}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        description: "Alternativa atualizada",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("alternative");
    expect(response.body.alternative.description).toBe("Alternativa atualizada");
 
  });
});
