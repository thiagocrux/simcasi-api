import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { CreatePermissionUseCase } from '../../../useCases';

export function createPermissionUseCase() {
  return new CreatePermissionUseCase(PermissionsRepository, RolesRepository);
}
