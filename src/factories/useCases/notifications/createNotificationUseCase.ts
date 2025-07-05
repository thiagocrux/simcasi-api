import { CreateNotificationUseCase } from '../../../useCases';

import {
  NotificationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createNotificationUseCase() {
  return new CreateNotificationUseCase(
    NotificationsRepository,
    PatientsRepository
  );
}
