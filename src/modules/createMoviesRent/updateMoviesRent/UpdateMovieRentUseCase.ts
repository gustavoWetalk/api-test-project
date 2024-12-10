import { prisma } from "../../prisma/client";

interface CreateMovieResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function UpdateMoviesRentUseCase({
  movieId,
  userId,
  newMovieId,
  newUserId,
}: {
  movieId?: string;
  userId?: string;
  newMovieId?: string;
  newUserId?: string;
}): Promise<CreateMovieResult> {
  if (!userId || !movieId) {
    return {
      success: false,
      error: "Ambos userId e movieId devem ser fornecidos para localizar o registro.",
    };
  }


  const movieRentExists = await prisma.moviesRent.findUnique({
    where: {
      userId_movieId: { userId, movieId },
    },
  });

  if (!movieRentExists) {
    return {
      success: false,
      error: "Registro não encontrado para os critérios especificados.",
    };
  }

  
  await prisma.moviesRent.delete({
    where: {
      userId_movieId: { userId, movieId },
    },
  });

 
  await prisma.moviesRent.create({
    data: {
      userId: newUserId || userId,
      movieId: newMovieId || movieId,
    },
  });

  return {
    success: true,
    message: "Registro atualizado com sucesso.",
  };
}
