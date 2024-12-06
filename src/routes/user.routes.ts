import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/getAllUsers/CreateUserController";

const userRoutes = Router();

userRoutes.post("/", (req, res) => CreateUserController(req, res));
userRoutes.get("/", (req, res) => GetAllUsersController(req, res));

export { userRoutes };
