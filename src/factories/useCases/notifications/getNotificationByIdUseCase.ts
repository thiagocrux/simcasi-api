import { NotificationsRepository } from '../../../repositories';
import { GetNotificationByIdUseCase } from '../../../useCases';

export function getNotificationByIdUseCase() {
  const notificationsRepository = new NotificationsRepository();
  return new GetNotificationByIdUseCase(notificationsRepository);
}
