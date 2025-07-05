import { PermissionsRepository } from '../../../repositories';
import { UpdatePermissionUseCase } from '../../../useCases';

export function updatePermissionUseCase() {
  return new UpdatePermissionUseCase(PermissionsRepository);
}
