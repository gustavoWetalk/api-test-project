import request from "supertest";
import express from "express";
import { movieRoutes } from "../src/routes/movie.routes";

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

describe("Testando rotas de aluguel dos filmes", () => {
  it("O aluguel não pode ser feito, pois o filme já foi alugado", async () => {
    const response = await request(app)
      .post("/movies/rent")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fac949",
        movieId: "7640548b-083f-45ec-9c5c-839174468a1b",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Filme já foi alugado");
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
  it("O alguel não pode ser feito, pois o usuário não existe no sistema", async () => {
    const response = await request(app)
      .post("/movies/rent")
      .send({
        userId: "1f04b48f-a52b-4fe8-ac94-239832fa78788",
        movieId: "20bc53f6-e148-4a90-9288-f2ff489c171c",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("message", "Usuário não existe");
  });
});
