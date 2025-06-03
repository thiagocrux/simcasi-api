import { Request, Response } from 'express';

import {
  createCreateRoleUseCase,
  createDeleteRoleUseCase,
  createGetAllRolesUseCase,
  createGetRoleByIdUseCase,
  createUpdateRoleUseCase,
} from '../factories';

export class RolesController {
  public async index(request: Request, response: Response) {
    const roles = await createGetAllRolesUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(roles);
  }

  public async show(request: Request, response: Response) {
    const role = await createGetRoleByIdUseCase().execute(request.params.id);
    response.status(200).json(role);
  }

  public async create(request: Request, response: Response) {
    const role = await createCreateRoleUseCase().execute(request.body);
    response.status(201).json(role);
  }

  public async update(request: Request, response: Response) {
    const updatedRole = await createUpdateRoleUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedRole);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteRoleUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
