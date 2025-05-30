import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { ACCOUNT_ROLES, permissionsByRole } from '../config';
import { PermissionsRepository, RolesRepository } from '../repositories';

import {
  InvalidIdentifierError,
  NotFoundError,
  UniqueConstraintViolationError,
} from '../utils';

export class PermissionsController {
  static async index(request: Request, response: Response) {
    const order = request.query.order === 'desc' ? 'desc' : 'asc';
    const permission = await PermissionsRepository.findAll(order);
    response.status(200).json(permission);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await PermissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    response.status(200).json(permission);
  }

  static async create(request: Request, response: Response) {
    const { code } = request.body;

    const permissionAlreadyExists = await PermissionsRepository.find({
      code,
    });

    if (permissionAlreadyExists) {
      throw new UniqueConstraintViolationError('permission');
    }

    const permission = await PermissionsRepository.create({ code });

    ACCOUNT_ROLES.forEach(async (role) => {
      if (permissionsByRole[role].includes(permission.code)) {
        await RolesRepository.addPermission(role, String(permission._id));
      }
    });

    response.status(201).json(permission);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { code } = request.body;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await PermissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    const updatedRole = await PermissionsRepository.update(
      { _id: id },
      { code }
    );

    response.status(200).json(updatedRole);
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await PermissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    ACCOUNT_ROLES.forEach(async (role) => {
      if (permissionsByRole[role].includes(permission.code)) {
        await RolesRepository.removePermission(role, String(permission._id));
      }
    });

    await PermissionsRepository.delete(id);
    response.sendStatus(204);
  }
}
