import { CreateNotificationSchema } from '../../schemas';
import { CreateNotificationDTO, NotificationsRepository } from '../../types';

export class CreateNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  public async execute(body: CreateNotificationDTO) {
    CreateNotificationSchema.parse(body);
    const notification = await this.notificationsRepository.create(body);
    return notification;
  }
}
