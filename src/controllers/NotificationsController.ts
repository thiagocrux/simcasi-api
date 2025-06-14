import { Request, Response } from 'express';

import {
  createCreateNotificationUseCase,
  createDeleteNotificationUseCase,
  createGetAllNotificationsUseCase,
  createGetNotificationByIdUseCase,
  createUpdateNotificationUseCase,
} from '../factories';

export class NotificationsController {
  public async index(request: Request, response: Response) {
    const notifications = await createGetAllNotificationsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(notifications);
  }

  public async show(request: Request, response: Response) {
    const notification = await createGetNotificationByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(notification);
  }

  public async create(request: Request, response: Response) {
    const notification = await createCreateNotificationUseCase().execute(
      request.body
    );
    response.status(201).json(notification);
  }

  public async update(request: Request, response: Response) {
    const updatedNotification = await createUpdateNotificationUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedNotification);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteNotificationUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
