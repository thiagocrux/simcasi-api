import { describe, expect, it } from 'vitest';

import {
  CustomError,
  ExpiredSessionError,
  InvalidAccessTokenError,
  InvalidCredentialsError,
  InvalidIdentifierError,
  MissingAccessTokenError,
  MissingDataError,
  NotFoundError,
  SessionCreationError,
  UnauthorizedError,
  UniqueConstraintViolationError,
  UniqueEmailViolationError,
} from '../../../src/utils';

describe('errors', () => {
  describe('ErrorBase', () => {
    it('should have enumerable message and stack properties', () => {
      const error = new NotFoundError('Test');

      const properties = Object.keys(error);
      expect(properties).toContain('message');
      expect(properties).toContain('stack');
    });
  });

  describe('UniqueEmailViolationError', () => {
    it('should have correct properties', () => {
      const error = new UniqueEmailViolationError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('This e-mail is already taken.');
      expect(error.name).toBe('UniqueEmailViolationError');
      expect(error.stack).toBeDefined();
    });
  });

  describe('UniqueConstraintViolationError', () => {
    it('should have correct properties', () => {
      const subject = 'Username';
      const error = new UniqueConstraintViolationError(subject);

      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('The username already exists.');
      expect(error.name).toBe('UniqueConstraintViolationError');
    });
  });

  describe('NotFoundError', () => {
    it('should have correct properties', () => {
      const subject = 'User';
      const error = new NotFoundError(subject);

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('The user could not be found.');
      expect(error.name).toBe('NotFoundError');
    });
  });

  describe('MissingDataError', () => {
    it('should have correct properties', () => {
      const subject = 'Email';
      const error = new MissingDataError(subject);

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('The email is missing.');
      expect(error.name).toBe('MissingDataError');
    });
  });

  describe('InvalidIdentifierError', () => {
    it('should have correct properties', () => {
      const error = new InvalidIdentifierError();

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('The ID is invalid.');
      expect(error.name).toBe('InvalidIdentifierError');
    });
  });

  describe('UnauthorizedError', () => {
    it('should have correct properties', () => {
      const error = new UnauthorizedError();

      expect(error.statusCode).toBe(403);

      expect(error.message).toBe(
        "You don't have permission to access this resource."
      );

      expect(error.name).toBe('UnauthorizedError');
    });
  });

  describe('InvalidCredentialsError', () => {
    it('should have correct properties', () => {
      const error = new InvalidCredentialsError();

      expect(error.statusCode).toBe(401);

      expect(error.message).toBe(
        'The provided email or password is incorrect.'
      );

      expect(error.name).toBe('InvalidCredentialsError');
    });
  });

  describe('MissingAccessTokenError', () => {
    it('should have correct properties', () => {
      const error = new MissingAccessTokenError();

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('The access token is missing.');
      expect(error.name).toBe('MissingAccessTokenError');
    });
  });

  describe('InvalidAccessTokenError', () => {
    it('should have correct properties', () => {
      const error = new InvalidAccessTokenError();

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('The access token is invalid.');
      expect(error.name).toBe('InvalidAccessTokenError');
    });
  });

  describe('ExpiredSessionError', () => {
    it('should have correct properties', () => {
      const error = new ExpiredSessionError();

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('This session has expired.');
      expect(error.name).toBe('ExpiredSessionError');
    });
  });

  describe('SessionCreationError', () => {
    it('should have correct properties', () => {
      const error = new SessionCreationError();

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('An error occurred while creating a session.');
      expect(error.name).toBe('SessionCreationError');
    });
  });
});
