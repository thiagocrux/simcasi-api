import { ExamsController } from '../../controllers';

import {
  createExamUseCase,
  deleteExamUseCase,
  getAllExamsByPatientUseCase,
  getAllExamsUseCase,
  getExamByIdUseCase,
  updateExamUseCase,
} from '..';

export function examsController() {
  return new ExamsController(
    getAllExamsUseCase(),
    getAllExamsByPatientUseCase(),
    getExamByIdUseCase(),
    createExamUseCase(),
    updateExamUseCase(),
    deleteExamUseCase()
  );
}
