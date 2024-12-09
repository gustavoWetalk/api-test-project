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
    movieId: string;
    userId: string;
    newMovieId: string;
    newUserId: string;
  }): Promise<CreateMovieResult> {
    const movieRentExists = await prisma.moviesRent.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
  
    if (!movieRentExists) {
      return {
        success: false,
        error: "Registro não encontrado para o filme e usuário especificados",
      };
    }
  
    // Atualizar o registro
    await prisma.moviesRent.update({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
      data: {
        userId: newUserId,
        movieId: newMovieId,
      },
    });
  
    return {
      success: true,
      message: "Registro atualizado com sucesso",
    };
  }
  
