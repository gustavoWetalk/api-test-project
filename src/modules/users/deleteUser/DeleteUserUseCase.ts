import { prisma } from "../../prisma/client";

interface CreateMovieResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function DeleteUserUseCase({
  id,
}: any): Promise<CreateMovieResult> {
  const userDelete = await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    data: "Usuário Excluído com sucesso",
  };
}
