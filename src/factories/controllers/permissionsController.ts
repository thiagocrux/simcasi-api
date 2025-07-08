import { PermissionsController } from '../../controllers';

import {
  createPermissionUseCase,
  deletePermissionUseCase,
  getAllPermissionsUseCase,
  getPermissionByIdUseCase,
  updatePermissionUseCase,
} from '..';

export function permissionsController() {
  return new PermissionsController(
    createPermissionUseCase(),
    deletePermissionUseCase(),
    getAllPermissionsUseCase(),
    getPermissionByIdUseCase(),
    updatePermissionUseCase()
  );
}
