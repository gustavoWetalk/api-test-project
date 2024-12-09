import { Request, Response } from "express";
import { UpdateMoviesUseCase } from "./UpdateMoviesUseCase";

export async function UpdateMoviesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { title, duration, release_date } = req.body;
    const id = req.params.id;

    const result = await UpdateMoviesUseCase({
      id,
      title,
      duration,
      release_date,
    });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(201).json(result.message);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
