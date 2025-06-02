import {
  CreatePermissionDTO,
  PermissionFilter,
  UpdatePermissionDTO,
} from '../..';

import { PermissionDocument } from '../../../models';

export interface PermissionsRepository {
  findAll(order: 'asc' | 'desc'): Promise<PermissionDocument[]>;
  find(filter: PermissionFilter): Promise<PermissionDocument | null>;
  create(body: CreatePermissionDTO): Promise<PermissionDocument>;
  update(
    filter: PermissionFilter,
    body: UpdatePermissionDTO
  ): Promise<PermissionDocument | null>;
  delete(id: string): Promise<PermissionDocument | null>;
}
