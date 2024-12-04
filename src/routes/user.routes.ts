import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";

const createUserController = new CreateUserController();

const userRoutes = Router();

userRoutes.post("/", (req, res) => createUserController.handle(req, res));

export { userRoutes };
