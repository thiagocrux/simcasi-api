import { RolesRepository } from '../../../repositories';
import { CreateRoleUseCase } from '../../../useCases';

export function createCreateRoleUseCase() {
  return new CreateRoleUseCase(RolesRepository);
}
