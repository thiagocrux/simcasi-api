import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { CreatePermissionUseCase } from '../../../useCases';

export function createPermissionUseCase() {
  const permissionsRepository = new PermissionsRepository();
  const rolesRepository = new RolesRepository();
  return new CreatePermissionUseCase(permissionsRepository, rolesRepository);
}
