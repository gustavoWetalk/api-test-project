import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;

      const createUserUseCase = new CreateUserUseCase();
      const result = await createUserUseCase.execute({ name, email });

      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }

      return res.status(201).json(result.data);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
