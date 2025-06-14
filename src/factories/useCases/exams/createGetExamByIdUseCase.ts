import { ExamsRepository } from '../../../repositories';
import { GetAllExamsUseCase } from '../../../useCases';

export function createGetExamByIdUseCase() {
  return new GetAllExamsUseCase(ExamsRepository);
}
