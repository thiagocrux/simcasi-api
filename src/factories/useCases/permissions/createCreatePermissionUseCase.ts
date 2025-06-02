import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { CreatePermissionUseCase } from '../../../useCases';

export function createCreatePermissionUseCase() {
  return new CreatePermissionUseCase(PermissionsRepository, RolesRepository);
}
