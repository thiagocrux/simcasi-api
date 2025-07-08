import { SessionsController } from '../../controllers';

import {
  createSessionUseCase,
  deleteSessionUseCase,
  generateNewAccessTokenUseCase,
  getAllSessionsUseCase,
  getSessionByIdUseCase,
} from '..';

export function sessionsController() {
  return new SessionsController(
    createSessionUseCase(),
    deleteSessionUseCase(),
    generateNewAccessTokenUseCase(),
    getAllSessionsUseCase(),
    getSessionByIdUseCase()
  );
}
