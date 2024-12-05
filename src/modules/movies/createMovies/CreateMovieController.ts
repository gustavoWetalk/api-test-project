import { Request, Response } from "express";
import { CreateMovieUseCase } from "./CreateMoviesUseCase";

export async function CreateMovieController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, duration, release_date } = req.body;

    const result = await CreateMovieUseCase({ title, duration, release_date });

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    return res.status(201).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
}
