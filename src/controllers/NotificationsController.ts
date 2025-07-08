import { Request, Response } from 'express';

import {
  CreateNotificationUseCase,
  DeleteNotificationUseCase,
  GetAllNotificationsUseCase,
  GetNotificationByIdUseCase,
  UpdateNotificationUseCase,
} from '../types';

export class NotificationsController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private readonly getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private readonly updateNotificationUseCase: UpdateNotificationUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const notifications = await this.getAllNotificationsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(notifications);
  }

  public async show(request: Request, response: Response) {
    const notification = await this.getNotificationByIdUseCase.execute(
      request.params.id
    );

    response.status(200).json(notification);
  }

  public async create(request: Request, response: Response) {
    const notification = await this.createNotificationUseCase.execute(
      request.body
    );

    response.status(201).json(notification);
  }

  public async update(request: Request, response: Response) {
    const updatedNotification = await this.updateNotificationUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedNotification);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteNotificationUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
