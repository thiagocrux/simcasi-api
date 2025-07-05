import { RolesRepository } from '../../../repositories';
import { GetRoleByIdUseCase } from '../../../useCases';

export function getRoleByIdUseCase() {
  const rolesRepository = new RolesRepository();
  return new GetRoleByIdUseCase(rolesRepository);
}
