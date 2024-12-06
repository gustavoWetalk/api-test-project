import { Request, Response } from "express";
import { DeleteMovieUseCase } from "./DeleteMovieUseCase";

export async function DeleteMovieController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;

    const result = await DeleteMovieUseCase({ id });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
