import { Request, Response } from 'express';

import { RolesRepository } from '../repositories/RolesRepository';

import {
  handleDuplicationError,
  handleInvalidIDFormatError,
  handleNotFoundError,
  isObjectIdValid,
} from '../utils';

export class RolesController {
  static async index(request: Request, response: Response) {
    const roles = await RolesRepository.findAll();
    console.log(roles);
    response.status(200).json(roles);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isObjectIdValid(id)) {
      handleInvalidIDFormatError({ id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const role = await RolesRepository.findById(id);

    if (!role) {
      handleNotFoundError({ name: 'Role', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    response.status(200).json(role);
  }

  static async create(request: Request, response: Response) {
    const { name } = request.body;
    const nameAlreadyExists = await RolesRepository.findByName(name);

    if (nameAlreadyExists) {
      handleDuplicationError({ name: 'Role' }, (error) => {
        response.status(error.status).json({ error: error.message });
      });

      return;
    }

    const role = await RolesRepository.create({ name });
    response.status(201).json(role);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isObjectIdValid(id)) {
      handleInvalidIDFormatError({ id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const role = await RolesRepository.findById(id);

    if (!role) {
      handleNotFoundError({ name: 'Role', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const updatedRole = await RolesRepository.update(id, { name });
    response.status(200).json(updatedRole);
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isObjectIdValid(id)) {
      handleInvalidIDFormatError({ id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const role = await RolesRepository.findById(id);

    if (!role) {
      handleNotFoundError({ name: 'Role', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    await RolesRepository.delete(id);
    response.sendStatus(204);
  }
}
