import { isValidObjectId } from 'mongoose';

import { ACCOUNT_ROLES } from '../../schemas';
import { PermissionsRepository, RolesRepository } from '../../types';

import {
  InvalidIdentifierError,
  NotFoundError,
  getRolePermissions,
} from '../../utils';

export class DeletePermissionUseCase {
  constructor(
    private readonly permissionsRepository: PermissionsRepository,
    private readonly rolesRepository: RolesRepository
  ) {}

  async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await this.permissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    ACCOUNT_ROLES.forEach(async (roleName) => {
      const role = await this.rolesRepository.find({ name: roleName });

      if (!role) {
        throw new NotFoundError('role');
      }

      const { permissions: previousPermissions } = role;

      const newPermissions = previousPermissions.filter(
        (permissionCode) => permissionCode !== permission.code
      );

      if (getRolePermissions(roleName).includes(permission.code)) {
        await this.rolesRepository.update(
          { _id: role._id },
          { permissions: newPermissions }
        );
      }
    });

    await this.permissionsRepository.delete({ _id: id });
  }
}
