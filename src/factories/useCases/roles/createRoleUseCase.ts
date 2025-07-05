import { RolesRepository } from '../../../repositories';
import { CreateRoleUseCase } from '../../../useCases';

export function createRoleUseCase() {
  return new CreateRoleUseCase(RolesRepository);
}
