import { PermissionsRepository } from '../../../repositories';
import { GetAllPermissionsUseCase } from '../../../useCases';

export function getAllPermissionsUseCase() {
  return new GetAllPermissionsUseCase(PermissionsRepository);
}
