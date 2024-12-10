import { prisma } from "../../prisma/client";

interface CreateMovieResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function UpdateMoviesUseCase({
  id,
  title,
  duration,
  release_date,
}: {
  id: string;
  title: string;
  duration: number;
  release_date: Date;
}): Promise<CreateMovieResult> {
  const MovieExists = await prisma.movie.findUnique({
    where: {
      id,
    },
  });

  if (!MovieExists) {
    return {
      success: false,
      error: "Não foi possível atualizar o filme",
    };
  }

  const NameAlredyExiist = await prisma.movie.findUnique({
    where:{
      title
    }
  })
    

  if(title === NameAlredyExiist?.title){
    return {
      success: false,
      error: "Titulo já cadastrado",
    };
  }
  if (title === "" || release_date === null || duration === null) {
    return {
      success: false,
      error: "Campos sem informações não são permitidos",
    };
  }

  if (!title && !duration && !release_date) {
    return {
      success: false,
      error:
        "Não foi possível atualizar o filme, você deve colocar pelo menos uma informação para atualizar o filme",
    };
  }

  await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title: title,
      duration: duration,
      release_date: release_date,
    },
  });

  return {
    success: true,
    message: "Usuário atualizado com sucesso",
  };
}
