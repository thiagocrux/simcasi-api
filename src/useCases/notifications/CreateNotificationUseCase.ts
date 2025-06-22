import { CreateNotificationSchema } from '../../schemas';
import { NotFoundError } from '../../utils';

import {
  CreateNotificationDTO,
  NotificationsRepository,
  PatientsRepository,
} from '../../types';

export class CreateNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  public async execute(body: CreateNotificationDTO) {
    CreateNotificationSchema.parse(body);
    const patient = await this.patientsRepository.find({ _id: body.patient });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    const notification = await this.notificationsRepository.create(body);
    return notification;
  }
}
