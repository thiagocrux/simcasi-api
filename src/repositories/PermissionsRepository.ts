import { Permission } from '../models';

interface CreatePermissionDTO {
  code: string;
}

interface UpdatePermissionDTO {
  code: string;
}

export class PermissionsRepository {
  static async findAll() {
    const permissions = await Permission.find();
    return permissions;
  }

  static async findById(id: string) {
    const permission = await Permission.findById(id);
    return permission;
  }

  static async findByCode(code: string) {
    const permission = await Permission.findOne({ code });
    return permission;
  }

  static async create({ code }: CreatePermissionDTO) {
    const permission = await Permission.create({ code });
    return permission;
  }

  static async update(id: string, { code }: UpdatePermissionDTO) {
    const role = await Permission.findOneAndUpdate(
      { _id: id },
      { code },
      { new: true }
    );

    return role;
  }

  static async delete(id: string) {
    const role = await Permission.findByIdAndDelete(id);
    return role;
  }
}
