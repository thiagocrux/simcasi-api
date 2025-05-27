import { Role } from '../models';
import { CreateRoleDTO, RoleFilter, UpdateRoleDTO } from '../types';

export class RolesRepository {
  static async findAll(order: 'asc' | 'desc') {
    const roles = await Role.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return roles;
  }

  static async find(filter: RoleFilter) {
    const role = await Role.findOne(filter);
    return role;
  }

  static async create(body: CreateRoleDTO) {
    const role = await Role.create(body);
    return role;
  }

  static async update(filter: RoleFilter, body: UpdateRoleDTO) {
    const role = await Role.findOneAndUpdate(filter, body, { new: true });
    return role;
  }

  static async delete(filter: RoleFilter) {
    const role = await Role.findOneAndDelete(filter);
    return role;
  }

  // FIXME: Improve?

  static async getRolePermissions(id: string) {
    const role = await Role.findOne({ _id: id }).populate({
      path: 'permissions',
      select: 'code -_id',
      transform: (item) => item.code,
    });

    return role?.permissions;
  }

  static async addPermission(role: string, permissionId: string) {
    const updatedRole = Role.findOneAndUpdate(
      { name: role },
      { $push: { permissions: permissionId } },
      { new: true }
    );

    return updatedRole;
  }

  static async removePermission(role: string, permissionId: string) {
    const updatedRole = await Role.findOneAndUpdate(
      { name: role },
      { $pull: { permissions: permissionId } },
      { new: true }
    );

    return updatedRole;
  }
}
