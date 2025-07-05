import { ExamsRepository } from '../../../repositories';
import { GetAllExamsUseCase } from '../../../useCases';

export function getAllExamsUseCase() {
  return new GetAllExamsUseCase(ExamsRepository);
}
