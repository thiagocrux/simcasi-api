import { ExamsRepository } from '../../../repositories';
import { GetAllExamsUseCase } from '../../../useCases';

export function createGetAllExamsUseCase() {
  return new GetAllExamsUseCase(ExamsRepository);
}
