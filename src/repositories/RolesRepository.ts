import { Role } from '../models';

interface CreateRoleDTO {
  name: string;
}

interface UpdateRoleDTO {
  name: string;
}

export class RolesRepository {
  static async findAll() {
    const roles = await Role.find();
    return roles;
  }

  static async findById(id: string) {
    const role = await Role.findById(id);
    return role;
  }

  static async findByName(name: string) {
    const role = await Role.findOne({ name });
    return role;
  }

  static async create({ name }: CreateRoleDTO) {
    const role = await Role.create({ name });
    return role;
  }

  static async update(id: string, { name }: UpdateRoleDTO) {
    const role = await Role.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );

    return role;
  }

  static async delete(id: string) {
    const role = await Role.findByIdAndDelete(id);
    return role;
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
