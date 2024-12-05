import { CreateMovieRentDTO } from "../movies/dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO) {}
}
