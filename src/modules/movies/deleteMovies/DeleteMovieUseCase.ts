import { prisma } from "../../prisma/client";

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
  
  return {
    success: true,
    data: "Produto Excluído com sucesso",
  };
}
