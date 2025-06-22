import { CreateNotificationUseCase } from '../../../useCases';

import {
  NotificationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createCreateNotificationUseCase() {
  return new CreateNotificationUseCase(
    NotificationsRepository,
    PatientsRepository
  );
}
