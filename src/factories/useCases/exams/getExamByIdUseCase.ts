import { ExamsRepository } from '../../../repositories';
import { GetExamByIdUseCase } from '../../../useCases';

export function getExamByIdUseCase() {
  return new GetExamByIdUseCase(ExamsRepository);
}
