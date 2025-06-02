// accounts-repository.interface.ts
import { CreateRoleDTO, RoleFilter, UpdateRoleDTO } from '../..';
import { RoleDocument } from '../../../models';

export interface RolesRepository {
  findAll(order: 'asc' | 'desc'): Promise<RoleDocument[]>;
  find(filter: RoleFilter): Promise<RoleDocument | null>;
  create(body: CreateRoleDTO): Promise<RoleDocument>;
  update(filter: RoleFilter, body: UpdateRoleDTO): Promise<RoleDocument | null>;
  delete(filter: RoleFilter): Promise<void>;
}
