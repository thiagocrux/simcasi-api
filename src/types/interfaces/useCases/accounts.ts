import { CreateAccountDTO, UpdateAccountDTO } from '../..';
import { AccountDocument } from '../../../models';

/**
 * Interface for creating a new account
 */
export interface CreateAccountUseCase {
  /**
   * Creates a new account after validating the role exists
   * @param body - The account data to create
   * @returns Promise<AccountDocument> The created account
   * @throws NotFoundError when role does not exist
   * @throws ConflictError when email already exists
   */
  execute(body: CreateAccountDTO): Promise<AccountDocument>;
}

/**
 * Interface for deleting an account by ID
 */
export interface DeleteAccountUseCase {
  /**
   * Deletes an account by its ID
   * @param id - The account ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when account does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all accounts
 */
export interface GetAllAccountsUseCase {
  /**
   * Retrieves all accounts with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<AccountDocument[]> Array of account documents
   */
  execute(orderBy: string): Promise<AccountDocument[]>;
}

/**
 * Interface for retrieving an account by ID
 */
export interface GetAccountByIdUseCase {
  /**
   * Retrieves an account by its ID
   * @param id - The account ID to retrieve
   * @returns Promise<AccountDocument> The account document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when account does not exist
   */
  execute(id: string): Promise<AccountDocument>;
}

/**
 * Interface for updating an account
 */
export interface UpdateAccountUseCase {
  /**
   * Updates an account by its ID
   * @param id - The account ID to update
   * @param body - The account data to update
   * @returns Promise<AccountDocument | null> The updated account document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when account does not exist
   * @throws ConflictError when email already exists
   */
  execute(id: string, body: UpdateAccountDTO): Promise<AccountDocument | null>;
}
