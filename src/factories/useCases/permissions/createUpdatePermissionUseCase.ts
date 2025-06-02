import { PermissionsRepository } from '../../../repositories';
import { UpdatePermissionUseCase } from '../../../useCases';

export function createUpdatePermissionUseCase() {
  return new UpdatePermissionUseCase(PermissionsRepository);
}
