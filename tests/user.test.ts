import request from "supertest";
import express from "express";
import { userRoutes } from "../src/routes/user.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

describe("Testando rota de usuário", () => {
  it("Não deve criar o usuário, porque ele já está cadastrado no sistema", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "William",
        email: "Gustavo@batata123.com.br",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Usuário já existe!");
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve criar usuário, pois o email é inválido", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Batata",
        email: "123345664",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Email inválido, por favor cadastre um email válido!!"
    );
  });
});
