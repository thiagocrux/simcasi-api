import { isValidObjectId } from 'mongoose';

import { NotificationsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetNotificationByIdUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const notification = await this.notificationsRepository.find({ _id: id });

    if (!notification) {
      throw new NotFoundError('notification');
    }

    return notification;
  }
}
