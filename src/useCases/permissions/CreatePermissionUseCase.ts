import { ACCOUNT_ROLES, CreatePermissionSchema } from '../../schemas';

import {
  getRolePermissions,
  NotFoundError,
  UniqueConstraintViolationError,
} from '../../utils';

import {
  CreatePermissionDTO,
  PermissionsRepository,
  RolesRepository,
} from '../../types';

export class CreatePermissionUseCase {
  constructor(
    private readonly permissionsRepository: PermissionsRepository,
    private readonly rolesRepository: RolesRepository
  ) {}

  async execute({ code }: CreatePermissionDTO) {
    CreatePermissionSchema.parse({ code });

    const permissionAlreadyExists = await this.permissionsRepository.find({
      code,
    });

    if (permissionAlreadyExists) {
      throw new UniqueConstraintViolationError('permission');
    }

    const permission = await this.permissionsRepository.create({ code });

    for (const roleName of ACCOUNT_ROLES) {
      const role = await this.rolesRepository.find({ name: roleName });

      if (!role) {
        throw new NotFoundError('role');
      }

      const { permissions: previousPermissions = [] } = role;
      const newPermissions = [...previousPermissions, permission.code];

      if (getRolePermissions(roleName).includes(permission.code)) {
        await this.rolesRepository.update(
          { _id: role._id },
          { permissions: newPermissions }
        );
      }
    }

    return permission;
  }
}
