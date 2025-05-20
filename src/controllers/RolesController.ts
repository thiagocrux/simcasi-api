import { Request, Response } from 'express';

import { RolesRepository } from '../repositories/RolesRepository';

import {
  handleDuplicationError,
  handleInvalidIDFormatError,
  handleNotFoundError,
} from '../utils';

export class RolesController {
  static async index(request: Request, response: Response) {
    const roles = await RolesRepository.findAll();
    console.log(roles);
    response.status(200).json(roles);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    handleInvalidIDFormatError({ id }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    const role = await RolesRepository.findById(id);

    handleNotFoundError({ name: 'Role', id: id, condition: !!role }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    response.status(200).json(role);
  }

  static async create(request: Request, response: Response) {
    const { name } = request.body;

    const nameAlreadyExists = await RolesRepository.findByName(name);

    handleDuplicationError(
      { name: 'Role', condition: !!nameAlreadyExists },
      (error) => {
        response.status(error.status).json({ error: error.message });
      }
    );

    const role = await RolesRepository.create({ name });
    response.status(201).json(role);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    handleInvalidIDFormatError({ id }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    const role = await RolesRepository.findById(id);

    handleNotFoundError({ name: 'Role', id: id, condition: !!role }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    const updatedRole = await RolesRepository.update(id, { name });
    response.status(200).json(updatedRole);
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    handleInvalidIDFormatError({ id }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    const role = await RolesRepository.findById(id);

    handleNotFoundError({ name: 'Role', id: id, condition: !!role }, (error) =>
      response.status(error.status).json({ error: error.message })
    );

    await RolesRepository.delete(id);
    response.sendStatus(204);
  }
}
