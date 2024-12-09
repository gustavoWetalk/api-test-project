import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export async function UpdateUserController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email } = req.body;
    const id = req.params.id;

    const result = await UpdateUserUseCase({ id, name, email });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(201).json(result.message);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
