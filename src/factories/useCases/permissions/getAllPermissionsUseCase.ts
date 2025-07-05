import { PermissionsRepository } from '../../../repositories';
import { GetAllPermissionsUseCase } from '../../../useCases';

export function getAllPermissionsUseCase() {
  const permissionsRepository = new PermissionsRepository();
  return new GetAllPermissionsUseCase(permissionsRepository);
}
