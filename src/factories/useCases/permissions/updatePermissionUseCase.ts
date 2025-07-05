import { PermissionsRepository } from '../../../repositories';
import { UpdatePermissionUseCase } from '../../../useCases';

export function updatePermissionUseCase() {
  const permissionsRepository = new PermissionsRepository();
  return new UpdatePermissionUseCase(permissionsRepository);
}
