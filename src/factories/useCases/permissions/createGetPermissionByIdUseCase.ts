import { PermissionsRepository } from '../../../repositories';
import { GetPermissionByIdUseCase } from '../../../useCases';

export function createGetPermissionByIdUseCase() {
  return new GetPermissionByIdUseCase(PermissionsRepository);
}
