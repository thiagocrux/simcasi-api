import { RolesRepository } from '../../../repositories';
import { GetAllRolesUseCase } from '../../../useCases';

export function createGetAllRolesUseCase() {
  return new GetAllRolesUseCase(RolesRepository);
}
