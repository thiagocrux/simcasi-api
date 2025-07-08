import { ExamsController } from '../../controllers';

import {
  createExamUseCase,
  deleteExamUseCase,
  getAllExamsUseCase,
  getExamByIdUseCase,
  updateExamUseCase,
} from '..';

export function examsController() {
  return new ExamsController(
    getAllExamsUseCase(),
    getExamByIdUseCase(),
    createExamUseCase(),
    updateExamUseCase(),
    deleteExamUseCase()
  );
}
