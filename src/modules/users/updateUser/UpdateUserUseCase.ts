import { prisma } from "../../prisma/client";

interface CreateUserResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function UpdateUserUseCase({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}): Promise<CreateUserResult> {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!userExists) {
    return {
      success: false,
      error: "Não foi possível atualizar o Usuário",
    };
  }

  if (email === "" || name === "") {
    return {
      success: false,
      error: "Campos sem informações não são permitidos",
    };
  }

  if (!email && !name) {
    return {
      success: false,
      error:
        "Não foi possível atualizar o Usuário, você deve colocar pelo menos uma informação para atualizar o usuário",
    };
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: name,
      email: email,
    },
  });

  return {
    success: true,
    message: "Usuário atualizado com sucesso",
  };
}
