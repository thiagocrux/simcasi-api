import { CreateObservationDTO, UpdateObservationDTO } from '../..';
import { ObservationDocument } from '../../../models';

/**
 * Interface for creating a new observation
 */
export interface CreateObservationUseCase {
  /**
   * Creates a new observation after validating the patient exists
   * @param body - The observation data to create
   * @returns Promise<ObservationDocument> The created observation
   * @throws NotFoundError when patient does not exist
   */
  execute(body: CreateObservationDTO): Promise<ObservationDocument>;
}

/**
 * Interface for deleting an observation by ID
 */
export interface DeleteObservationUseCase {
  /**
   * Deletes an observation by its ID
   * @param id - The observation ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when observation does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all observations
 */
export interface GetAllObservationsUseCase {
  /**
   * Retrieves all observations with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<ObservationDocument[]> Array of observation documents
   */
  execute(orderBy: string): Promise<ObservationDocument[]>;
}

/**
 * Interface for retrieving an observation by ID
 */
export interface GetObservationByIdUseCase {
  /**
   * Retrieves an observation by its ID
   * @param id - The observation ID to retrieve
   * @returns Promise<ObservationDocument> The observation document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when observation does not exist
   */
  execute(id: string): Promise<ObservationDocument>;
}

/**
 * Interface for updating an observation
 */
export interface UpdateObservationUseCase {
  /**
   * Updates an observation by its ID
   * @param id - The observation ID to update
   * @param body - The observation data to update
   * @returns Promise<ObservationDocument | null> The updated observation document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when observation does not exist
   */
  execute(
    id: string,
    body: UpdateObservationDTO
  ): Promise<ObservationDocument | null>;
}
