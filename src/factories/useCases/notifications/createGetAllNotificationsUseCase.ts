import { NotificationsRepository } from '../../../repositories';
import { GetAllNotificationsUseCase } from '../../../useCases';

export function createGetAllNotificationsUseCase() {
  return new GetAllNotificationsUseCase(NotificationsRepository);
}
