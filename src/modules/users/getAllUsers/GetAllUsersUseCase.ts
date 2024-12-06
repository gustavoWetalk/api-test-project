import { User } from "@prisma/client";
import { prisma } from "../../prisma/client";

interface CreateUserResult {
  success: boolean;
  data?: User[];
  error?: string;
}

export async function GetAllUsersUseCase(): Promise<CreateUserResult> {
  const users = await prisma.user.findMany({
    include: {
      MoviesRent: {
        select: {
          movie: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });
  if (!users) {
    return {
      success: false,
      error: "Nenhum usuário cadastrado no sistema",
    };
  }
  return {
    success: true,
    data: users,
  };
}
