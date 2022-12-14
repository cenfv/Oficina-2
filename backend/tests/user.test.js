const request = require("supertest");
const app = require("../app");
const MongoMemoryServer = require("../src/database/mongodb/MongoMemoryServer");

beforeAll(async () => await MongoMemoryServer.connect());

afterAll(async () => await MongoMemoryServer.closeDatabase());

let token = "";
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

    const authResponse = await request(app).post("/auth").send({
      email: "carlosnfreitasv@gmail.com",
      password: "werty2510",
    });
    token = authResponse.body.token;
    const userResponse = await request(app).get(`/user/${response.body.user._id}`).set("Authorization", `bearer ${token}`);
    expect(userResponse.status).toBe(200);
    expect(userResponse.body).toHaveProperty("user");
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

    const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
    let count = 0
    userResponse.body.user.forEach((user) => user.email === "carlosnfreitasv@gmail.com" && count++);
    expect(count).toBe(1);
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

    const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
    count = 0;
    userResponse.body.user.forEach((user) => user.password.length < 6 && count++);
    expect(count).toBe(0);
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

    const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);

    count = 0;
    userResponse.body.user.forEach((user) => user.email === "carlosnfreitav" && count++);
    expect(count).toBe(0);
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

      const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
      let count = 0;
      userResponse.body.user.forEach((user) => user.firstName === "" && count++);
      expect(count).toBe(0);

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

      const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
      let count = 0;
      userResponse.body.user.forEach((user) => user.lastName === "" && count++);
      expect(count).toBe(0);
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

      const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
      let count = 0;
      userResponse.body.user.forEach((user) => user.email === "" && count++);
      expect(count).toBe(0);
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

      const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
      let count = 0;
      userResponse.body.user.forEach((user) => user.email === "" && count++);
      expect(count).toBe(0);
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

      const userResponse = await request(app).get(`/user/`).set("Authorization", `bearer ${token}`);
      let count = 0;
      userResponse.body.user.forEach((user) => user.gender === "" && count++);
      expect(count).toBe(0);
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
      expect(response.body).toHaveProperty("user");

      const userResponse = await request(app).get(`/user/${userId}`).set("Authorization", `bearer ${userToken}`);
      expect(userResponse.body.user.lastName).toBe("Veiga");
    });

    it("Should not be able to update a user with invalid token", async () => {
      const response = await request(app)
        .put(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}123`)
        .send({
          firstName: "Carlos Eduardo",
          lastName: "Oliveira",
          email: "carlosnfreitasv@gmail.com",
          password: "werty2510",
          gender: "masculino",
        });
      expect(response.status).toBe(400);

      const userResponse = await request(app).get(`/user/${userId}`).set("Authorization", `bearer ${userToken}`);
      expect(userResponse.body.user.lastName).not.toBe("Oliveira");
      expect(userResponse.body.user.lastName).toBe("Veiga");
    });

    it("Should not be able to update a user with the Id of another user", async () => {
      //user creation
      await request(app).post("/user").send({
        firstName: "Samuel",
        lastName: "Porto",
        email: "samuel@gmail.com",
        password: "samuel123",
        gender: "masculino",
      });
      //user authentication
      const userAuthResponse = await request(app).post("/auth").send({
        email: "samuel@gmail.com",
        password: "samuel123",
      });

      const anotherUserId = userAuthResponse.body.user._id;

      const response = await request(app)
        .put(`/user/${anotherUserId}`)
        .set("Authorization", `bearer ${userToken}`)
        .send({
          firstName: "Joao",
          lastName: "Pedro",
          email: "joao@gmail.com",
          password: "werty2510",
          gender: "masculino",
        });
      expect(response.status).toBe(404);

      const userResponse = await request(app).get(`/user/${userId}`).set("Authorization", `bearer ${userToken}`);
      expect(userResponse.body.user.lastName).not.toBe("Pedro");
      expect(userResponse.body.user.lastName).toBe("Veiga");
    });
  });

  describe("Delete user", () => {
  
    it("Should not be able to delete a user with invalid token", async () => {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}abc`);
      expect(response.status).toBe(400);

      const userResponse = await request(app).get(`/user/${userId}`).set("Authorization", `bearer ${userToken}`);
      expect(userResponse.status).toBe(200);
      expect(userResponse.body).toHaveProperty("user");
    });

    it("Should not be able to delete a user with the Id of another user", async () => {
      const userAuthResponse = await request(app).post("/auth").send({
        email: "samuel@gmail.com",
        password: "samuel123",
      });

      const anotherUserId = userAuthResponse.body.user._id;
      const response = await request(app)
        .delete(`/user/${anotherUserId}`)
        .set("Authorization", `bearer ${userToken}`);
      expect(response.status).toBe(404);

      const userResponse = await request(app).get(`/user/${anotherUserId}`).set("Authorization", `bearer ${userAuthResponse.body.token}`);
      expect(userResponse.status).toBe(200);
      expect(userResponse.body).toHaveProperty("user");
    });

    it("Should be able to delete a user", async () => {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `bearer ${userToken}`);
      expect(response.status).toBe(200);

      const userResponse = await request(app).get(`/user/${userId}`).set("Authorization", `bearer ${userToken}`);
      expect(userResponse.status).toBe(404);
    });
  });
});
