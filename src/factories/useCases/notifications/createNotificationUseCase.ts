import { CreateNotificationUseCase } from '../../../useCases';

import {
  NotificationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createNotificationUseCase() {
  const notificationsRepository = new NotificationsRepository();
  const patientsRepository = new PatientsRepository();

  return new CreateNotificationUseCase(
    notificationsRepository,
    patientsRepository
  );
}
