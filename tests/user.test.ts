import request from "supertest";
import express from "express";
import { userRoutes } from "../src/routes/user.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

describe("Testando rota de usuário", () => {
  it("Deve criar um usuário com sucesso", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "William",
        email: "Gustavo@batata123.com.br",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("name", "William");
    expect(response.body).toHaveProperty("email", "Gustavo@batata123.com.br");
  });
});
