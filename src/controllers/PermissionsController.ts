import { Request, Response } from 'express';

import { permissionsByRole, ROLES } from '../config';
import { PermissionsRepository, RolesRepository } from '../repositories';

import {
  handleDuplicationError,
  handleInvalidIDFormatError,
  handleNotFoundError,
  isObjectIdValid,
} from '../utils';

export class PermissionsController {
  static async index(request: Request, response: Response) {
    const permission = await PermissionsRepository.findAll();
    response.status(200).json(permission);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isObjectIdValid(id)) {
      handleInvalidIDFormatError({ id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      handleNotFoundError({ name: 'Permission', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    response.status(200).json(permission);
  }

  static async create(request: Request, response: Response) {
    const { code } = request.body;

    const permissionAlreadyExists =
      await PermissionsRepository.findByCode(code);

    if (permissionAlreadyExists) {
      handleDuplicationError({ name: 'Permission' }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const permission = await PermissionsRepository.create({ code });

    ROLES.forEach(async (role) => {
      if (permissionsByRole[role].includes(permission.code)) {
        await RolesRepository.addPermission(role, permission.code);
      }
    });

    response.status(201).json(permission);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { code } = request.body;

    if (!isObjectIdValid(id)) {
      handleInvalidIDFormatError({ id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      handleNotFoundError({ name: 'Permission', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const updatedRole = await PermissionsRepository.update(id, { code });
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

    const permission = await PermissionsRepository.findById(id);

    if (!permission) {
      handleNotFoundError({ name: 'Permission', id: id }, (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    ROLES.forEach(async (role) => {
      if (permissionsByRole[role].includes(permission.code)) {
        await RolesRepository.removePermission(role, permission.code);
      }
    });

    await PermissionsRepository.delete(id);
    response.sendStatus(204);
  }
}
