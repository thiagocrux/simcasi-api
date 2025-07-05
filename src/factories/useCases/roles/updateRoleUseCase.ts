import { RolesRepository } from '../../../repositories';
import { UpdateRoleUseCase } from '../../../useCases';

export function updateRoleUseCase() {
  return new UpdateRoleUseCase(RolesRepository);
}
