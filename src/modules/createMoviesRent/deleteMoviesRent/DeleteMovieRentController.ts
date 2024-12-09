import { Request, Response } from "express";
import { DeleteMovieRentUseCase } from "./DeleteMovieRentUseCase";

export async function DeleteMovieRentController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      res
        .status(400)
        .json({ message: "Os campos 'userId' e 'movieId' são obrigatórios!" });
      return;
    }

    const result = await DeleteMovieRentUseCase({ userId, movieId });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({ message: result.data });
  } catch (error: any) {
    console.error(error); 
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
