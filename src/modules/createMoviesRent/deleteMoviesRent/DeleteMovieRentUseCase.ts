import { prisma } from "../../prisma/client";

interface CreateMovieRentResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function DeleteMovieRentUseCase({
  userId,
  movieId,
}: {
  userId: string;
  movieId: string;
}): Promise<CreateMovieRentResult> {
  const existingRent = await prisma.moviesRent.findUnique({
    where: {
      userId_movieId: { userId, movieId },
    },
  });

  if (!existingRent) {
    return {
      success: false,
      error:
        "Não foi possível excluir o aluguel, pois ele não se encontra no sistema!",
    };
  }

  await prisma.moviesRent.delete({
    where: {
      userId_movieId: {
        movieId,
        userId,
      },
    },
  });

  return {
    success: true,
    data: "Aluguel excluído com sucesso",
  };
}
