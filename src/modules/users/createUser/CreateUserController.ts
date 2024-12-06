import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export async function CreateUserController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email } = req.body;

    const result = await CreateUserUseCase({ name, email });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
