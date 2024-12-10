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
  name?: string;
  email?: string;
}): Promise<CreateUserResult> {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!userExists) {
    return {
      success: false,
      error: "Não foi possível atualizar o Usuário: usuário não encontrado",
    };
  }

  if (!name && !email) {
    return {
      success: false,
      error:
        "Você deve fornecer pelo menos uma informação para atualizar o usuário",
    };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      error: "Email inválido",
    };
  }

  const dataToUpdate: { name?: string; email?: string } = {};
  if (name) dataToUpdate.name = name;
  if (email) dataToUpdate.email = email;

  await prisma.user.update({
    where: {
      id,
    },
    data: dataToUpdate,
  });

  return {
    success: true,
    message: "Usuário atualizado com sucesso",
  };
}
