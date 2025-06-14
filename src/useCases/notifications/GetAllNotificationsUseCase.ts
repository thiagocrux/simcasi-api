import { NotificationsRepository } from '../../types';

export class GetAllNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const notifications = await this.notificationsRepository.findAll(order);
    return notifications;
  }
}
