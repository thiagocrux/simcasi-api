import { PermissionsRepository } from '../../types';

export class GetAllPermissionsUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const permissions = await this.permissionsRepository.findAll(order);
    return permissions;
  }
}
