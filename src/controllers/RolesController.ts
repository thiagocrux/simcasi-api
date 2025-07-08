import { Request, Response } from 'express';

import {
  CreateRoleUseCase,
  DeleteRoleUseCase,
  GetAllRolesUseCase,
  GetRoleByIdUseCase,
  UpdateRoleUseCase,
} from '../types';

export class RolesController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const roles = await this.getAllRolesUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(roles);
  }

  public async show(request: Request, response: Response) {
    const role = await this.getRoleByIdUseCase.execute(request.params.id);
    response.status(200).json(role);
  }

  public async create(request: Request, response: Response) {
    const role = await this.createRoleUseCase.execute(request.body);
    response.status(201).json(role);
  }

  public async update(request: Request, response: Response) {
    const updatedRole = await this.updateRoleUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedRole);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteRoleUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
