import { RolesRepository } from '../../../repositories';
import { GetAllRolesUseCase } from '../../../useCases';

export function getAllRolesUseCase() {
  const rolesRepository = new RolesRepository();
  return new GetAllRolesUseCase(rolesRepository);
}
