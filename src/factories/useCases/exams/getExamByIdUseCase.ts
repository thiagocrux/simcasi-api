import { ExamsRepository } from '../../../repositories';
import { GetExamByIdUseCase } from '../../../useCases';

export function getExamByIdUseCase() {
  const examsRepository = new ExamsRepository();
  return new GetExamByIdUseCase(examsRepository);
}
