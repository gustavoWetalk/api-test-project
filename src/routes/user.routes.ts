import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";

const userRoutes = Router();

userRoutes.post("/", CreateUserController);

export { userRoutes };
