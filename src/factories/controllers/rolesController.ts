import { RolesController } from '../../controllers';

import {
  createRoleUseCase,
  deleteRoleUseCase,
  getAllRolesUseCase,
  getRoleByIdUseCase,
  updateRoleUseCase,
} from '..';

export function rolesController() {
  return new RolesController(
    createRoleUseCase(),
    deleteRoleUseCase(),
    getAllRolesUseCase(),
    getRoleByIdUseCase(),
    updateRoleUseCase()
  );
}
