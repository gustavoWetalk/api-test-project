import request from "supertest";
import express from "express";
import { movieRoutes } from "../src/routes/movie.routes";

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

describe("Testando rotas de filmes", () => {
  it("Deve criar um filme com sucesso", async () => {
    const response = await request(app)
      .post("/movies")
      .send({
        title: "Clube da Luta",
        duration: 2,
        release_date: "2010-06-10T00:00:00.000Z",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("title", "Clube da Luta");
    expect(response.body).toHaveProperty("duration", 2);
    expect(response.body).toHaveProperty(
      "release_date",
      "2010-06-10T00:00:00.000Z"
    );
  });
});
