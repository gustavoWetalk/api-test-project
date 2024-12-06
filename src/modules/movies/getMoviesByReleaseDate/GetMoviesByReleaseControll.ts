import { Request, Response } from "express";
import { GetMoviesByReleaseDateUseCase } from "./GetMoviesByReleaseDateUseCase";

export async function GetMoviesByReleaseDateController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = await GetMoviesByReleaseDateUseCase();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
