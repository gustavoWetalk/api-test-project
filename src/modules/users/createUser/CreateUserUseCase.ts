import { User } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { CreateUserDTO } from "../dtos/createUserDTO";

interface CreateUserResult {
  success: boolean;
  data?: User;
  error?: string;
}

export async function CreateUserUseCase({
  name,
  email,
}: CreateUserDTO): Promise<CreateUserResult> {
  {
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    function ValidarEmail(email: string) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    if (!ValidarEmail(email)) {
      return {
        success: false,
        error: "Email inválido, por favor cadastre um email válido!!",
      };
    }

    if (userAlreadyExist) {
      return {
        success: false,
        error: "Usuário já existe!",
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return {
      success: true,
      data: user,
    };
  }
}
