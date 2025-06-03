import { RolesRepository } from '../../../repositories';
import { GetRoleByIdUseCase } from '../../../useCases';

export function createGetRoleByIdUseCase() {
  return new GetRoleByIdUseCase(RolesRepository);
}
