import { PermissionsRepository } from '../../../repositories';
import { GetPermissionByIdUseCase } from '../../../useCases';

export function getPermissionByIdUseCase() {
  return new GetPermissionByIdUseCase(PermissionsRepository);
}
