import { Router } from "express";
import { CreateMovieController } from "../modules/movies/createMovies/CreateMovieController";
import { CreateMovieRentController } from "../modules/createMoviesRent/CreateMovieRentController";

const movieRoutes = Router();

movieRoutes.post("/", (req, res) => CreateMovieController(req, res));
movieRoutes.post("/rent", (req, res) => CreateMovieRentController(req, res))

export { movieRoutes };
