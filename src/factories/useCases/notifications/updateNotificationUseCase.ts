import { NotificationsRepository } from '../../../repositories';
import { UpdateNotificationUseCase } from '../../../useCases';

export function updateNotificationUseCase() {
  const notificationsRepository = new NotificationsRepository();
  return new UpdateNotificationUseCase(notificationsRepository);
}
