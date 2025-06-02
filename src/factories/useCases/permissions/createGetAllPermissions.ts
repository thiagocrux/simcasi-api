import { PermissionsRepository } from '../../../repositories';
import { GetAllPermissionsUseCase } from '../../../useCases';

export function createGetAllPermissionsUseCase() {
  return new GetAllPermissionsUseCase(PermissionsRepository);
}
