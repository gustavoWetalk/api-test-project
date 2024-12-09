import { Request, Response } from "express";
import { UpdateMoviesRentUseCase } from "./updateMovieRentUseCase";

export async function UpdateMoviesController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { movieId, userId, newMovieId, newUserId } = req.body;

    const result = await UpdateMoviesRentUseCase({
      movieId,
      userId,
      newMovieId,
      newUserId,
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
