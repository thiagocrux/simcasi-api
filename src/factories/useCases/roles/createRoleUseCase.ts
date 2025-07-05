import { RolesRepository } from '../../../repositories';
import { CreateRoleUseCase } from '../../../useCases';

export function createRoleUseCase() {
  const rolesRepository = new RolesRepository();
  return new CreateRoleUseCase(rolesRepository);
}
