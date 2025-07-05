import { RolesRepository } from '../../../repositories';
import { UpdateRoleUseCase } from '../../../useCases';

export function updateRoleUseCase() {
  const rolesRepository = new RolesRepository();
  return new UpdateRoleUseCase(rolesRepository);
}
