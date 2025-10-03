import { NotificationsRepository } from '../../../repositories';
import { GetAllNotificationsByPatientUseCase } from '../../../useCases';

export function getAllNotificationsByPatientUseCase() {
  const notificationsRepository = new NotificationsRepository();
  return new GetAllNotificationsByPatientUseCase(notificationsRepository);
}
