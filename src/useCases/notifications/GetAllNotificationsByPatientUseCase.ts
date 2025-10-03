import { NotificationsRepository } from '../../types';

export class GetAllNotificationsByPatientUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(patientId: string, orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';

    const notifications = await this.notificationsRepository.findAllByPatient(
      patientId,
      order
    );

    return notifications;
  }
}
