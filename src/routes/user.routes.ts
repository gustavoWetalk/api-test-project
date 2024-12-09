import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/getAllUsers/CreateUserController";
import { DeleteUserController } from "../modules/users/deleteUser/DeleteMovieController";

const userRoutes = Router();

userRoutes.post("/", (req, res) => CreateUserController(req, res));
userRoutes.get("/", (req, res) => GetAllUsersController(req, res));
userRoutes.delete("/delete/:id", (req, res) => DeleteUserController(req, res));

export { userRoutes };
