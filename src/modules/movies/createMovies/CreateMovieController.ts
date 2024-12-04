import { Request, Response } from "express";
import { CreateMovieUseCase } from "./CreateMoviesUseCase";

export class CreateMovieController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { title, duration, release_date } = req.body;

      const createUserUseCase = new CreateMovieUseCase();
      const result = await createUserUseCase.execute({
        title,
        duration,
        release_date,
      });

      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }

      return res.status(201).json(result.data);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
