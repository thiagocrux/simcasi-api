import { Permission } from '../models';
import {
  CreatePermissionDTO,
  PermissionFilter,
  UpdatePermissionDTO,
} from '../types';

export class PermissionsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const permissions = await Permission.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return permissions;
  }

  public async find(filter: PermissionFilter) {
    const permission = await Permission.findOne(filter);
    return permission;
  }

  public async create(body: CreatePermissionDTO) {
    const permission = await Permission.create(body);
    return permission;
  }

  public async update(filter: PermissionFilter, body: UpdatePermissionDTO) {
    const role = await Permission.findOneAndUpdate(filter, body, { new: true });
    return role;
  }

  public async delete(filter: PermissionFilter) {
    await Permission.findOneAndDelete(filter);
  }
}
