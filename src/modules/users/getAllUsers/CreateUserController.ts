import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

export async function GetAllUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = await GetAllUsersUseCase();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
