import { Router } from "express";
import { CreateMovieController } from "../modules/movies/createMovies/CreateMovieController";
import { CreateMovieRentController } from "../modules/createMoviesRent/CreateMovieRentController";
import { GetMoviesByReleaseDateController } from "../modules/movies/getMoviesByReleaseDate/GetMoviesByReleaseControll";
import { DeleteMovieController } from "../modules/movies/deleteMovies/DeleteMovieController";

const movieRoutes = Router();

movieRoutes.post("/", (req, res) => CreateMovieController(req, res));
movieRoutes.post("/rent", (req, res) => CreateMovieRentController(req, res));
movieRoutes.get("/release", (req, res) =>GetMoviesByReleaseDateController(req, res));
movieRoutes.delete("/delete/:id", (req, res) => DeleteMovieController(req, res));

export { movieRoutes };
