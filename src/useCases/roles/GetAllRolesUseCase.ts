import { RolesRepository } from '../../types';

export class GetAllRolesUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const roles = await this.rolesRepository.findAll(order);
    return roles;
  }
}
