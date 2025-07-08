import { CreateExamDTO, UpdateExamDTO } from '../..';
import { ExamDocument } from '../../../models';

/**
 * Interface for creating a new exam
 */
export interface CreateExamUseCase {
  /**
   * Creates a new exam after validating the patient exists
   * @param body - The exam data to create
   * @returns Promise<ExamDocument> The created exam
   * @throws NotFoundError when patient does not exist
   */
  execute(body: CreateExamDTO): Promise<ExamDocument>;
}

/**
 * Interface for deleting an exam by ID
 */
export interface DeleteExamUseCase {
  /**
   * Deletes an exam by its ID
   * @param id - The exam ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when exam does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all exams
 */
export interface GetAllExamsUseCase {
  /**
   * Retrieves all exams with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<ExamDocument[]> Array of exam documents
   */
  execute(orderBy: string): Promise<ExamDocument[]>;
}

/**
 * Interface for retrieving an exam by ID
 */
export interface GetExamByIdUseCase {
  /**
   * Retrieves an exam by its ID
   * @param id - The exam ID to retrieve
   * @returns Promise<ExamDocument> The exam document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when exam does not exist
   */
  execute(id: string): Promise<ExamDocument>;
}

/**
 * Interface for updating an exam
 */
export interface UpdateExamUseCase {
  /**
   * Updates an exam by its ID
   * @param id - The exam ID to update
   * @param body - The exam data to update
   * @returns Promise<ExamDocument | null> The updated exam document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when exam does not exist
   */
  execute(id: string, body: UpdateExamDTO): Promise<ExamDocument | null>;
}
