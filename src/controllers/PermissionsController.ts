import { Request, Response } from 'express';

import {
  createCreatePermissionUseCase,
  createDeletePermissionUseCase,
  createGetAllPermissionsUseCase,
  createGetPermissionByIdUseCase,
  createUpdatePermissionUseCase,
} from '../factories';

export class PermissionsController {
  public async index(request: Request, response: Response) {
    const permissions = await createGetAllPermissionsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(permissions);
  }

  public async show(request: Request, response: Response) {
    const permission = await createGetPermissionByIdUseCase().execute(
      request.params._id
    );

    response.status(200).json(permission);
  }

  public async create(request: Request, response: Response) {
    const permission = await createCreatePermissionUseCase().execute(
      request.body
    );

    response.status(201).json(permission);
  }

  public async update(request: Request, response: Response) {
    const updatedPermission = await createUpdatePermissionUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPermission);
  }

  public async delete(request: Request, response: Response) {
    await createDeletePermissionUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
