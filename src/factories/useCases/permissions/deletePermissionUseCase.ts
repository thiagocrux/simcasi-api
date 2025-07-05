import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { DeletePermissionUseCase } from '../../../useCases';

export function deletePermissionUseCase() {
  const permissionsRepository = new PermissionsRepository();
  const rolesRepository = new RolesRepository();
  return new DeletePermissionUseCase(permissionsRepository, rolesRepository);
}
