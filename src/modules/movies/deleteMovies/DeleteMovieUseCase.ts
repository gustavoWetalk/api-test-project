import { Movie } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { CreateMovieDTO } from "../dtos/CreateMoviesDTO";

interface CreateMovieResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function DeleteMovieUseCase({
  id,
}: any): Promise<CreateMovieResult> {
  const MovieDelete = await prisma.movie.delete({
    where: {
      id,
    },
  });
  if (!MovieDelete) {
    return {
      success: false,
      error: "Filme não cadastrado no sistema, por favor tente novamente",
    };
  }

  return {
    success: true,
    data: "Produto Excluído com sucesso",
  };
}
