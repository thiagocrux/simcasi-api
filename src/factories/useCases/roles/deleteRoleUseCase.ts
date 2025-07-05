import { RolesRepository } from '../../../repositories';
import { DeleteRoleUseCase } from '../../../useCases';

export function deleteRoleUseCase() {
  const rolesRepository = new RolesRepository();
  return new DeleteRoleUseCase(rolesRepository);
}
