import { Movie } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { CreateMovieDTO } from "../dtos/CreateMoviesDTO";

interface CreateMovieResult {
  success: boolean;
  data?: Movie;
  error?: string;
}

export class CreateMovieUseCase {
  async execute({
    title,
    duration,
    release_date,
  }: CreateMovieDTO): Promise<CreateMovieResult> {
    const MovieAlreadyExist = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (MovieAlreadyExist) {
      return {
        success: false,
        error: "Filme já cadastrado no sistema",
      };
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date,
      },
    });

    return {
      success: true,
      data: movie,
    };
  }
}
