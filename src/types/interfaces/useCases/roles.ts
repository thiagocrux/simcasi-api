import { CreateRoleDTO, UpdateRoleDTO } from '../..';
import { RoleDocument } from '../../../models';

/**
 * Interface for creating a new role
 */
export interface CreateRoleUseCase {
  /**
   * Creates a new role after validating permissions exist
   * @param body - The role data to create
   * @returns Promise<RoleDocument> The created role
   * @throws NotFoundError when permissions do not exist
   * @throws ConflictError when role name already exists
   */
  execute(body: CreateRoleDTO): Promise<RoleDocument>;
}

/**
 * Interface for deleting a role by ID
 */
export interface DeleteRoleUseCase {
  /**
   * Deletes a role by its ID
   * @param id - The role ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when role does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all roles
 */
export interface GetAllRolesUseCase {
  /**
   * Retrieves all roles with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<RoleDocument[]> Array of role documents
   */
  execute(orderBy: string): Promise<RoleDocument[]>;
}

/**
 * Interface for retrieving a role by ID
 */
export interface GetRoleByIdUseCase {
  /**
   * Retrieves a role by its ID
   * @param id - The role ID to retrieve
   * @returns Promise<RoleDocument> The role document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when role does not exist
   */
  execute(id: string): Promise<RoleDocument>;
}

/**
 * Interface for updating a role
 */
export interface UpdateRoleUseCase {
  /**
   * Updates a role by its ID
   * @param id - The role ID to update
   * @param body - The role data to update
   * @returns Promise<RoleDocument | null> The updated role document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when role does not exist
   * @throws ConflictError when role name already exists
   */
  execute(id: string, body: UpdateRoleDTO): Promise<RoleDocument | null>;
}
