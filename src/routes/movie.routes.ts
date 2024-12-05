import { Router } from "express";
import { CreateMovieController } from "../modules/movies/createMovies/CreateMovieController";
import { CreateMovieRentController } from "../modules/createMoviesRent/CreateMovieRentController";

const movieRoutes = Router();

movieRoutes.post("/", CreateMovieController);
movieRoutes.post("/rent", CreateMovieRentController);

export { movieRoutes };
