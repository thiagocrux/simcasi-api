import { ExamsRepository } from '../../../repositories';
import { UpdateExamUseCase } from '../../../useCases';

export function createUpdateExamUseCase() {
  return new UpdateExamUseCase(ExamsRepository);
}
