import { prisma } from "../../prisma/client";

interface CreateMovieResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function DeleteUserUseCase({
  id,
}: any): Promise<CreateMovieResult> {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    return {
      success: false,
      error:
        "Não foi possível excluir o usuário do sistema, pois ele não foi encontrado",
    };
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    data: "Usuário Excluído com sucesso",
  };
}
