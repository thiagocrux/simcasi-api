import { CreateNotificationDTO, UpdateNotificationDTO } from '../..';
import { NotificationDocument } from '../../../models';

/**
 * Interface for creating a new notification
 */
export interface CreateNotificationUseCase {
  /**
   * Creates a new notification after validating the patient exists
   * @param body - The notification data to create
   * @returns Promise<NotificationDocument> The created notification
   * @throws NotFoundError when patient does not exist
   */
  execute(body: CreateNotificationDTO): Promise<NotificationDocument>;
}

/**
 * Interface for deleting a notification by ID
 */
export interface DeleteNotificationUseCase {
  /**
   * Deletes a notification by its ID
   * @param id - The notification ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when notification does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all notifications
 */
export interface GetAllNotificationsUseCase {
  /**
   * Retrieves all notifications with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<NotificationDocument[]> Array of notification documents
   */
  execute(orderBy: string): Promise<NotificationDocument[]>;
}

/**
 * Interface for retrieving a notification by ID
 */
export interface GetNotificationByIdUseCase {
  /**
   * Retrieves a notification by its ID
   * @param id - The notification ID to retrieve
   * @returns Promise<NotificationDocument> The notification document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when notification does not exist
   */
  execute(id: string): Promise<NotificationDocument>;
}

/**
 * Interface for updating a notification
 */
export interface UpdateNotificationUseCase {
  /**
   * Updates a notification by its ID
   * @param id - The notification ID to update
   * @param body - The notification data to update
   * @returns Promise<NotificationDocument | null> The updated notification document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when notification does not exist
   */
  execute(
    id: string,
    body: UpdateNotificationDTO
  ): Promise<NotificationDocument | null>;
}
