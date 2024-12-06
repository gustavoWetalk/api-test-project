import { Request, Response } from "express";
import { CreateMovieRentUseCase } from "./CreateMovieRentUseCase";

export async function CreateMovieRentController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { movieId, userId } = req.body;

    const result = await CreateMovieRentUseCase({ movieId, userId });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
