import { CreatePermissionDTO, UpdatePermissionDTO } from '../..';
import { PermissionDocument } from '../../../models';

/**
 * Interface for creating a new permission
 */
export interface CreatePermissionUseCase {
  /**
   * Creates a new permission
   * @param body - The permission data to create
   * @returns Promise<PermissionDocument> The created permission
   * @throws ConflictError when permission name already exists
   */
  execute(body: CreatePermissionDTO): Promise<PermissionDocument>;
}

/**
 * Interface for deleting a permission by ID
 */
export interface DeletePermissionUseCase {
  /**
   * Deletes a permission by its ID
   * @param id - The permission ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when permission does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all permissions
 */
export interface GetAllPermissionsUseCase {
  /**
   * Retrieves all permissions with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<PermissionDocument[]> Array of permission documents
   */
  execute(orderBy: string): Promise<PermissionDocument[]>;
}

/**
 * Interface for retrieving a permission by ID
 */
export interface GetPermissionByIdUseCase {
  /**
   * Retrieves a permission by its ID
   * @param id - The permission ID to retrieve
   * @returns Promise<PermissionDocument> The permission document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when permission does not exist
   */
  execute(id: string): Promise<PermissionDocument>;
}

/**
 * Interface for updating a permission
 */
export interface UpdatePermissionUseCase {
  /**
   * Updates a permission by its ID
   * @param id - The permission ID to update
   * @param body - The permission data to update
   * @returns Promise<PermissionDocument | null> The updated permission document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when permission does not exist
   * @throws ConflictError when permission name already exists
   */
  execute(
    id: string,
    body: UpdatePermissionDTO
  ): Promise<PermissionDocument | null>;
}
