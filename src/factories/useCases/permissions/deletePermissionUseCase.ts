import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { DeletePermissionUseCase } from '../../../useCases';

export function deletePermissionUseCase() {
  return new DeletePermissionUseCase(PermissionsRepository, RolesRepository);
}
