import { NotificationsRepository } from '../../../repositories';
import { GetAllNotificationsUseCase } from '../../../useCases';

export function getAllNotificationsUseCase() {
  return new GetAllNotificationsUseCase(NotificationsRepository);
}
