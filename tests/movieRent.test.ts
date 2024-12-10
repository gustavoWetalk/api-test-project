import request from "supertest";
import express from "express";
import { movieRoutes } from "../src/routes/movie.routes";

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode ser feito, pois o usuário não existe no sistema", async () => {
    const response = await request(app)
      .post("/movies/rent")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac949090909",
        movieId: "716561f3-f98b-4cb7-9fa5-9251d5af35c3",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Usuário não existe");
  });
});

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode ser feito, pois o filme não foi cadastrado", async () => {
    const response = await request(app)
      .post("/movies/rent")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac949",
        movieId: "7640548b-083f-45ec-9c5c-83917446654565765",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Filme não cadastrado no sistema"
    );
  });
});

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode ser feito, pois o filme já foi alugado", async () => {
    const response = await request(app)
      .post("/movies/rent")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac949",
        movieId: "0b8ccf7d-9414-4d20-a3de-734ebb49abfa",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Filme já foi alugado");
  });
});

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode ser excluído, pois não foi encontrado no sistema", async () => {
    const response = await request(app)
      .delete("/movies/rent/delete")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac9499090",
        movieId: "0b8ccf7d-9414-4d20-a3de-734ebb49abfa090090",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Não foi possível excluir o aluguel, pois ele não se encontra no sistema!"
    );
  });
});

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode sofer o update, pois não foi encontrado no sistema", async () => {
    const response = await request(app)
      .put("/movies/rent/update")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac9499090",
        movieId: "0b8ccf7d-9414-4d20-a3de-734ebb49abfa090090",
        newMovieId: "ttrtrgtgrgtrtgrtgtgr",
        newUserId: "ttrtrgtgrgtrtgrtgtgr",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Registro não encontrado para os critérios especificados."
    );
  });
});

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode sofer o update, pois não foi encontrado no sistema", async () => {
    const response = await request(app)
      .put("/movies/rent/update")
      .send({
        userId: "",
        movieId: "0b8ccf7d-9414-4d20-a3de-734ebb49abfa090090",
        newMovieId: "ttrtrgtgrgtrtgrtgtgr",
        newUserId: "ttrtrgtgrgtrtgrtgtgr",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Ambos userId e movieId devem ser fornecidos para localizar o registro."
    );
  });
});
