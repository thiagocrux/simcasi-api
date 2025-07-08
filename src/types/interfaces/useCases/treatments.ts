import { CreateTreatmentDTO, UpdateTreatmentDTO } from '../..';
import { TreatmentDocument } from '../../../models';

/**
 * Interface for creating a new treatment
 */
export interface CreateTreatmentUseCase {
  /**
   * Creates a new treatment after validating the patient exists
   * @param body - The treatment data to create
   * @returns Promise<TreatmentDocument> The created treatment
   * @throws NotFoundError when patient does not exist
   */
  execute(body: CreateTreatmentDTO): Promise<TreatmentDocument>;
}

/**
 * Interface for deleting a treatment by ID
 */
export interface DeleteTreatmentUseCase {
  /**
   * Deletes a treatment by its ID
   * @param id - The treatment ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when treatment does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all treatments
 */
export interface GetAllTreatmentsUseCase {
  /**
   * Retrieves all treatments with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<TreatmentDocument[]> Array of treatment documents
   */
  execute(orderBy: string): Promise<TreatmentDocument[]>;
}

/**
 * Interface for retrieving a treatment by ID
 */
export interface GetTreatmentByIdUseCase {
  /**
   * Retrieves a treatment by its ID
   * @param id - The treatment ID to retrieve
   * @returns Promise<TreatmentDocument> The treatment document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when treatment does not exist
   */
  execute(id: string): Promise<TreatmentDocument>;
}

/**
 * Interface for updating a treatment
 */
export interface UpdateTreatmentUseCase {
  /**
   * Updates a treatment by its ID
   * @param id - The treatment ID to update
   * @param body - The treatment data to update
   * @returns Promise<TreatmentDocument | null> The updated treatment document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when treatment does not exist
   */
  execute(
    id: string,
    body: UpdateTreatmentDTO
  ): Promise<TreatmentDocument | null>;
}
