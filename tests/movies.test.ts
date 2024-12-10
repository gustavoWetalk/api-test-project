import request from "supertest";
import express from "express";
import { movieRoutes } from "../src/routes/movie.routes";

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

describe("Testando rotas de filmes", () => {
  it("Não deve criar o filme, pois ele já está cadastrado", async () => {
    const response = await request(app)
      .post("/movies")
      .send({
        title: "Clube da Luta",
        duration: 2,
        release_date: "2010-06-10T00:00:00.000Z",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Filme já cadastrado no sistema"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve fazer o delete do filme, pois ele não existe no sistema.", async () => {
    const movieId = "123456";
    const response = await request(app)
      .delete(`/movies/delete/${movieId}`)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível excluir o filme do sistema, pois ele não foi encontrado"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve fazer o update do filme, pois o id não foi encontrado.", async () => {
    const movieId = "123456";
    const response = await request(app)
      .put(`/movies/update/${movieId}`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível atualizar o filme"
    );
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve fazer o update do filme, pois o nome já está cadastrado no sistema.", async () => {
    const movieId = "0bf474d4-aad2-4237-8e45-3acfebc32cdc";
    const response = await request(app)
      .put(`/movies/update/${movieId}`)
      .send({
        title: "Clube da Luta",
        duration: 2,
        release_date: "2010-06-10T00:00:00.000Z",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Título já cadastrado.");
  });
});

describe("Testando rota de usuário", () => {
  it("Não deve fazer o update do filme, pois alguns dos campos estava sem informações ao ser enviado para o sistema.", async () => {
    const movieId = "0bf474d4-aad2-4237-8e45-3acfebc32cdc";
    const response = await request(app)
      .put(`/movies/update/${movieId}`)
      .send({
        title: "",
        duration: 2,
        release_date: "2010-06-10T00:00:00.000Z",
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
  it("Não deve fazer o update do filme, pois nenhum dos campos estava preenchido.", async () => {
    const movieId = "0bf474d4-aad2-4237-8e45-3acfebc32cdc";
    const response = await request(app)
      .put(`/movies/update/${movieId}`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível atualizar o filme, você deve colocar pelo menos uma informação para atualizar o filme"
    );
  });
});
