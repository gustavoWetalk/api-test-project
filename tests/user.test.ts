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

describe("Testando rota de usuário", () => {
  it("Não é possível fazer update no usuário, pois o id não existe.", async () => {
    const userId = "123456";
    const response = await request(app)
      .put(`/users/update/${userId}`)
      .send({
        name: "Batata",
        email: "123345664",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível atualizar o Usuário"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não é possível fazer update no usuário, pois nenhum parâmetro foi mandado.", async () => {
    const userId = "32c53343-bbec-43a7-8561-b2ca95efaa2c";
    const response = await request(app)
      .put(`/users/update/${userId}`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível atualizar o Usuário, você deve colocar pelo menos uma informação para atualizar o usuário"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não é possível fazer update no usuário, pois uma das informações estava sem informação.", async () => {
    const userId = "32c53343-bbec-43a7-8561-b2ca95efaa2c";
    const response = await request(app)
      .put(`/users/update/${userId}`)
      .send({
        name: "Batata",
        email: "",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Campos sem informações não são permitidos"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve fazer o delete do usuário, pois ele não existe no sistema.", async () => {
    const userId = "123456";
    const response = await request(app)
      .delete(`/users/delete/${userId}`)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível excluir o usuário do sistema, pois ele não foi encontrado"
    );
  });
});
