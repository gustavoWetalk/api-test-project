import { Router } from "express";
import { CreateMovieController } from "../modules/movies/createMovies/CreateMovieController";
import { CreateMovieRentController } from "../modules/createMoviesRent/CreateMovieRentController";
import { GetMoviesByReleaseDateController } from "../modules/movies/getMoviesByReleaseDate/GetMoviesByReleaseControll";
import { DeleteMovieController } from "../modules/movies/deleteMovies/DeleteMovieController";
import { DeleteMovieRentController } from "../modules/createMoviesRent/deleteMoviesRent/DeleteMovieRentController";
import { UpdateMoviesController } from "../modules/movies/updateMovies/UpdateMoviesController";
import { UpdateMoviesRentController } from "../modules/createMoviesRent/updateMoviesRent/UpdateMovieController";

const movieRoutes = Router();

movieRoutes.post("/", (req, res) => CreateMovieController(req, res));
movieRoutes.post("/rent", (req, res) => CreateMovieRentController(req, res));
movieRoutes.get("/release", (req, res) =>
  GetMoviesByReleaseDateController(req, res)
);
movieRoutes.delete("/delete/:id", (req, res) =>
  DeleteMovieController(req, res)
);
movieRoutes.delete("/rent/delete", (req, res) =>
  DeleteMovieRentController(req, res)
);
movieRoutes.put("/update/:id", (req, res) => UpdateMoviesController(req, res));
movieRoutes.put("/rent/update", (req, res) =>
  UpdateMoviesRentController(req, res)
);

export { movieRoutes };
