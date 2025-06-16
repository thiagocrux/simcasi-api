import { isValidObjectId } from 'mongoose';

import { UpdateNotificationSchema } from '../../schemas';
import { NotificationsRepository, UpdateNotificationDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(id: string, body: UpdateNotificationDTO) {
    UpdateNotificationSchema.parse(body);

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const notification = await this.notificationsRepository.find({ _id: id });

    if (!notification) {
      throw new NotFoundError('notification');
    }

    const updatedNotification = await this.notificationsRepository.update(
      { _id: id },
      body
    );

    return updatedNotification;
  }
}
