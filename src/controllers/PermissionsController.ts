import { Request, Response } from 'express';

import {
  createPermissionUseCase,
  deletePermissionUseCase,
  getAllPermissionsUseCase,
  getPermissionByIdUseCase,
  updatePermissionUseCase,
} from '../factories';

export class PermissionsController {
  public async index(request: Request, response: Response) {
    const permissions = await getAllPermissionsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(permissions);
  }

  public async show(request: Request, response: Response) {
    const permission = await getPermissionByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(permission);
  }

  public async create(request: Request, response: Response) {
    const permission = await createPermissionUseCase().execute(request.body);

    response.status(201).json(permission);
  }

  public async update(request: Request, response: Response) {
    const updatedPermission = await updatePermissionUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPermission);
  }

  public async delete(request: Request, response: Response) {
    await deletePermissionUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
