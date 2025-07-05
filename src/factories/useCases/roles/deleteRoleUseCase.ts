import { RolesRepository } from '../../../repositories';
import { DeleteRoleUseCase } from '../../../useCases';

export function deleteRoleUseCase() {
  return new DeleteRoleUseCase(RolesRepository);
}
