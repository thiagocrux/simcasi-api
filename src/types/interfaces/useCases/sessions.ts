import { CreateSessionDTO } from '../..';
import { SessionDocument } from '../../../models';

/**
 * Interface for creating a new session (sign-in)
 */
export interface CreateSessionUseCase {
  /**
   * Creates a new session after validating credentials
   * @param body - The session data to create
   * @returns Promise<{ accessToken: string; session: string }> The access and session tokens
   * @throws UnauthorizedError when credentials are invalid
   * @throws NotFoundError when account does not exist
   */
  execute(
    body: CreateSessionDTO,
    {
      ipAddress,
      userAgent,
    }: { ipAddress: string | null; userAgent: string | null }
  ): Promise<{ accessToken: string; session: string }>;
}

/**
 * Interface for deleting a session by ID
 */
export interface DeleteSessionUseCase {
  /**
   * Deletes a session by its ID (sign-out)
   * @param id - The session ID to delete
   * @returns Promise<void>
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when session does not exist
   */
  execute(id: string): Promise<void>;
}

/**
 * Interface for retrieving all sessions
 */
export interface GetAllSessionsUseCase {
  /**
   * Retrieves all sessions with specified ordering
   * @param orderBy - Sort order ('asc' or 'desc')
   * @returns Promise<SessionDocument[]> Array of session documents
   */
  execute(orderBy: string): Promise<SessionDocument[]>;
}

/**
 * Interface for retrieving a session by ID
 */
export interface GetSessionByIdUseCase {
  /**
   * Retrieves a session by its ID
   * @param id - The session ID to retrieve
   * @returns Promise<SessionDocument> The session document
   * @throws InvalidIdentifierError when ID format is invalid
   * @throws NotFoundError when session does not exist
   */
  execute(id: string): Promise<SessionDocument>;
}

/**
 * Interface for refreshing a session token
 */
export interface GenerateNewAccessTokenUseCase {
  /**
   * Refreshes a session token
   * @param refreshToken - The refresh token
   * @returns Promise<string> The refreshed access token
   * @throws ExpiredSessionError when session is invalid or inactive
   * @throws NotFoundError when session or related account does not exist
   */
  execute(sessionId: string): Promise<string>;
}
