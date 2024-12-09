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
  } catch (error: any) {
    if (error.code === "P2025") {
      res
        .status(400)
        .json({
          message:
            "Não foi possível excluir o filme, pois ele não se encontra no sistema!",
        });
      return;
    }
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
