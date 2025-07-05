import { Role } from '../models';
import { CreateRoleDTO, RoleFilter, UpdateRoleDTO } from '../types';

export class RolesRepository {
  public async findAll(order: 'asc' | 'desc') {
    const roles = await Role.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return roles;
  }

  public async find(filter: RoleFilter) {
    const role = await Role.findOne(filter);
    return role;
  }

  public async create(body: CreateRoleDTO) {
    const role = await Role.create(body);
    return role;
  }

  public async update(filter: RoleFilter, body: UpdateRoleDTO) {
    const role = await Role.findOneAndUpdate(filter, body, { new: true });
    return role;
  }

  public async delete(filter: RoleFilter): Promise<void> {
    await Role.findOneAndDelete(filter);
  }
}
