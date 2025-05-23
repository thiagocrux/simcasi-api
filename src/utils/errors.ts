export abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.defineProperty(this, 'message', {
      enumerable: true,
      value: message,
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
