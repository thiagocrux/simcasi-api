import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { createGetAllRolesUseCase } from '../factories';
import { RolesRepository } from '../repositories';

import {
  InvalidIdentifierError,
  NotFoundError,
  UniqueConstraintViolationError,
} from '../utils';

export class RolesController {
  public async index(request: Request, response: Response) {
    const roles = await createGetAllRolesUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(roles);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await RolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    response.status(200).json(role);
  }

  public async create(request: Request, response: Response) {
    const { name } = request.body;
    const roleAlreadyExists = await RolesRepository.find({ name });

    if (roleAlreadyExists) {
      throw new UniqueConstraintViolationError('role');
    }

    const role = await RolesRepository.create({ name });
    response.status(201).json(role);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await RolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    const updatedRole = await RolesRepository.update({ _id: id }, { name });

    response.status(200).json(updatedRole);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await RolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    await RolesRepository.delete({ _id: id });
    response.sendStatus(204);
  }
}
