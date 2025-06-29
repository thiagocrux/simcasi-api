export abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.defineProperty(this, 'message', {
      enumerable: true,
      value: message,
    });
    Object.defineProperty(this, 'stack', {
      enumerable: true,
    });
  }
}

export class UniqueEmailViolationError extends CustomError {
  readonly statusCode = 409;

  constructor() {
    super('This e-mail is already taken.');
  }
}

export class UniqueConstraintViolationError extends CustomError {
  readonly statusCode = 409;

  constructor(subject: string) {
    super(`The ${subject?.toLowerCase()} already exists.`);
  }
}

export class NotFoundError extends CustomError {
  readonly statusCode = 404;

  constructor(subject: string) {
    super(`The ${subject?.toLowerCase()} could not be found.`);
  }
}

export class MissingDataError extends CustomError {
  readonly statusCode = 400;

  constructor(subject: string) {
    super(`The ${subject?.toLowerCase()} is missing.`);
  }
}

export class InvalidIdentifierError extends CustomError {
  readonly statusCode = 400;

  constructor() {
    super('The ID is invalid.');
  }
}

export class UnauthorizedError extends CustomError {
  readonly statusCode = 403;

  constructor() {
    super("You don't have permission to access this resource.");
  }
}

export class InvalidCredentialsError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super('The provided email or password is incorrect.');
  }
}

export class MissingAccessTokenError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super('The access token is missing.');
  }
}

export class InvalidAccessTokenError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super('The access token is invalid.');
  }
}

export class ExpiredSessionError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super('This session has expired.');
  }
}

export class SessionCreationError extends CustomError {
  readonly statusCode = 500;

  constructor() {
    super('An error occurred while creating a session.');
  }
}
