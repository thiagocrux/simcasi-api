import { RolesRepository } from '../../../repositories';
import { DeleteRoleUseCase } from '../../../useCases';

export function createDeleteRoleUseCase() {
  return new DeleteRoleUseCase(RolesRepository);
}
