import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export async function DeleteUserController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;

    const result = await DeleteUserUseCase({ id });

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json(result.data);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(400).json({
        message:
          "Não foi possível excluir o usuário, pois ele não foi encontrado no sistema!",
      });
      return;
    }
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
