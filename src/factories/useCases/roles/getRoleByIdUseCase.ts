import { RolesRepository } from '../../../repositories';
import { GetRoleByIdUseCase } from '../../../useCases';

export function getRoleByIdUseCase() {
  return new GetRoleByIdUseCase(RolesRepository);
}
