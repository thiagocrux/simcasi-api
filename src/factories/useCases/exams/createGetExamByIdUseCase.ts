import { ExamsRepository } from '../../../repositories';
import { GetExamByIdUseCase } from '../../../useCases';

export function createGetExamByIdUseCase() {
  return new GetExamByIdUseCase(ExamsRepository);
}
