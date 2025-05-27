import { Permission } from '../models';
import {
  CreatePermissionDTO,
  PermissionFilter,
  UpdatePermissionDTO,
} from '../types';

export class PermissionsRepository {
  static async findAll(order: 'asc' | 'desc') {
    const permissions = await Permission.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return permissions;
  }

  static async find(filter: PermissionFilter) {
    const permission = await Permission.findOne(filter);
    return permission;
  }

  static async create(body: CreatePermissionDTO) {
    const permission = await Permission.create(body);
    return permission;
  }

  static async update(filter: PermissionFilter, body: UpdatePermissionDTO) {
    const role = await Permission.findOneAndUpdate(filter, body, { new: true });
    return role;
  }

  static async delete(id: string) {
    const role = await Permission.findByIdAndDelete(id);
    return role;
  }
}
