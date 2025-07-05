import { NotificationsRepository } from '../../../repositories';
import { GetAllNotificationsUseCase } from '../../../useCases';

export function getAllNotificationsUseCase() {
  const notificationsRepository = new NotificationsRepository();
  return new GetAllNotificationsUseCase(notificationsRepository);
}
