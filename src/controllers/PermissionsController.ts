import { Request, Response } from 'express';

import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  GetAllPermissionsUseCase,
  GetPermissionByIdUseCase,
  UpdatePermissionUseCase,
} from '../types';

export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly getAllPermissionsUseCase: GetAllPermissionsUseCase,
    private readonly getPermissionByIdUseCase: GetPermissionByIdUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const permissions = await this.getAllPermissionsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(permissions);
  }

  public async show(request: Request, response: Response) {
    const permission = await this.getPermissionByIdUseCase.execute(
      request.params.id
    );

    response.status(200).json(permission);
  }

  public async create(request: Request, response: Response) {
    const permission = await this.createPermissionUseCase.execute(request.body);
    response.status(201).json(permission);
  }

  public async update(request: Request, response: Response) {
    const updatedPermission = await this.updatePermissionUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPermission);
  }

  public async delete(request: Request, response: Response) {
    await this.deletePermissionUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
