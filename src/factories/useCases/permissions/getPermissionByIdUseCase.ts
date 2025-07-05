import { PermissionsRepository } from '../../../repositories';
import { GetPermissionByIdUseCase } from '../../../useCases';

export function getPermissionByIdUseCase() {
  const permissionsRepository = new PermissionsRepository();
  return new GetPermissionByIdUseCase(permissionsRepository);
}
