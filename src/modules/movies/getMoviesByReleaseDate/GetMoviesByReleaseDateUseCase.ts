import { Movie } from "@prisma/client";
import { prisma } from "../../prisma/client";

export async function GetMoviesByReleaseDateUseCase(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    orderBy: {
      release_date: "desc",
    },
    include: {
      MoviesRent: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return movies;
}
