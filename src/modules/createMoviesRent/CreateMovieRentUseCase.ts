import { MoviesRent } from "@prisma/client";
import { CreateMovieRentDTO } from "../movies/dtos/CreateMovieRentDTO";
import { prisma } from "../prisma/client";

interface CreateMovieRentResult {
  success: boolean;
  data?: MoviesRent;
  error?: string;
}

export async function CreateMovieRentUseCase({
  movieId,
  userId,
}: CreateMovieRentDTO) {
  const MovieExist = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!MovieExist) {
    return {
      success: false,
      error: "Filme não cadastrado no sistema",
    };
  }

  const movieAlreadyRented = await prisma.moviesRent.findFirst({
    where: {
      movieId,
    },
  });
  if (movieAlreadyRented) {
    return {
      success: false,
      error: "Filme já foi alugado",
    };
  }
  const userExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userExist) {
    return {
      success: false,
      error: "Usuário não existe",
    };
  }
  const movieRent = await prisma.moviesRent.create({
    data: {
      movieId,
      userId,
    },
  });

  return {
    success: true,
    data: movieRent,
  };
}
