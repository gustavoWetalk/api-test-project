import { prisma } from "../../prisma/client";

interface CreateMovieResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function DeleteMovieUseCase({
  id,
}: any): Promise<CreateMovieResult> {
  const movieExists = await prisma.movie.findUnique({
    where: {
      id,
    },
  });

  if (!movieExists) {
    return {
      success: false,
      error: "Não foi possível excluir o filme do sistema, pois ele não foi encontrado",
    };
  }

  await prisma.movie.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    data: "Produto Excluído com sucesso",
  };
}
