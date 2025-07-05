import { Request, Response } from 'express';

import {
  createRoleUseCase,
  deleteRoleUseCase,
  getAllRolesUseCase,
  getRoleByIdUseCase,
  updateRoleUseCase,
} from '../factories';

export class RolesController {
  public async index(request: Request, response: Response) {
    const roles = await getAllRolesUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(roles);
  }

  public async show(request: Request, response: Response) {
    const role = await getRoleByIdUseCase().execute(request.params.id);
    response.status(200).json(role);
  }

  public async create(request: Request, response: Response) {
    const role = await createRoleUseCase().execute(request.body);
    response.status(201).json(role);
  }

  public async update(request: Request, response: Response) {
    const updatedRole = await updateRoleUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedRole);
  }

  public async delete(request: Request, response: Response) {
    await deleteRoleUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
