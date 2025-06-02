import { PermissionsRepository, RolesRepository } from '../../../repositories';
import { DeletePermissionUseCase } from '../../../useCases';

export function createDeletePermissionUseCase() {
  return new DeletePermissionUseCase(PermissionsRepository, RolesRepository);
}
