import { RolesRepository } from '../../../repositories';
import { GetAllRolesUseCase } from '../../../useCases';

export function getAllRolesUseCase() {
  return new GetAllRolesUseCase(RolesRepository);
}
