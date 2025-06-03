import { RolesRepository } from '../../../repositories';
import { UpdateRoleUseCase } from '../../../useCases';

export function createUpdateRoleUseCase() {
  return new UpdateRoleUseCase(RolesRepository);
}
