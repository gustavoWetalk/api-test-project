import { Router } from "express";
import { CreateMovieController } from "../modules/movies/createMovies/CreateMovieController";

const movieRoutes = Router();

movieRoutes.post("/", CreateMovieController);

export { movieRoutes };
