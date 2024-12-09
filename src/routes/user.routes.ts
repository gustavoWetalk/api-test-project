import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/getAllUsers/CreateUserController";
import { DeleteUserController } from "../modules/users/deleteUser/DeleteMovieController";
import { UpdateUserController } from "../modules/users/updateUser/UpdateUserController";

const userRoutes = Router();

userRoutes.post("/", (req, res) => CreateUserController(req, res));
userRoutes.get("/", (req, res) => GetAllUsersController(req, res));
userRoutes.delete("/delete/:id", (req, res) => DeleteUserController(req, res));
userRoutes.put("/update/:id", (req, res) => UpdateUserController(req, res));

export { userRoutes };
