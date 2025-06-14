import { ExamsRepository } from '../../../repositories';
import { CreateExamUseCase } from '../../../useCases';

export function createCreateExamUseCase() {
  return new CreateExamUseCase(ExamsRepository);
}
