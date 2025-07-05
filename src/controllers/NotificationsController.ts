import { Request, Response } from 'express';

import {
  createNotificationUseCase,
  deleteNotificationUseCase,
  getAllNotificationsUseCase,
  getNotificationByIdUseCase,
  updateNotificationUseCase,
} from '../factories';

export class NotificationsController {
  public async index(request: Request, response: Response) {
    const notifications = await getAllNotificationsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(notifications);
  }

  public async show(request: Request, response: Response) {
    const notification = await getNotificationByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(notification);
  }

  public async create(request: Request, response: Response) {
    const notification = await createNotificationUseCase().execute(
      request.body
    );
    response.status(201).json(notification);
  }

  public async update(request: Request, response: Response) {
    const updatedNotification = await updateNotificationUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedNotification);
  }

  public async delete(request: Request, response: Response) {
    await deleteNotificationUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
