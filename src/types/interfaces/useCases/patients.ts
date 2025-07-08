import { CreatePatientDTO, UpdatePatientDTO } from '../..';
import { PatientDocument } from '../../../models';

/**
 * Interface for creating a new patient
 */
export interface CreatePatientUseCase {
  /**
   * Creates a new patient
   * @param body - The patient data to create
   * @returns Promise<PatientDocument> The created patient
   * @throws ConflictError when CPF already exists
   */
  execute(body: CreatePatientDTO): Promise<PatientDocument>;
}

/**
 * Interface for deleting a patient by ID
 */
export interface DeletePatientUseCase {
  /**
   * Deletes a patient by its ID
   * @param id - The patient ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when patient does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all patients
 */
export interface GetAllPatientsUseCase {
  /**
   * Retrieves all patients with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<PatientDocument[]> Array of patient documents
   */
  execute(orderBy: string): Promise<PatientDocument[]>;
}

/**
 * Interface for retrieving a patient by ID
 */
export interface GetPatientByIdUseCase {
  /**
   * Retrieves a patient by its ID
   * @param id - The patient ID to retrieve
   * @returns Promise<PatientDocument> The patient document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when patient does not exist
   */
  execute(id: string): Promise<PatientDocument>;
}

/**
 * Interface for updating a patient
 */
export interface UpdatePatientUseCase {
  /**
   * Updates a patient by its ID
   * @param id - The patient ID to update
   * @param body - The patient data to update
   * @returns Promise<PatientDocument | null> The updated patient document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when patient does not exist
   * @throws ConflictError when CPF already exists
   */
  execute(id: string, body: UpdatePatientDTO): Promise<PatientDocument | null>;
}
