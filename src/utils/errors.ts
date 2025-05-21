interface ErrorResponse {
  status: number;
  message: string;
}

export class ValidationError {
  static duplicatedEmail(onError: (errorResponse: ErrorResponse) => void) {
    onError({
      message: 'This e-mail is already taken.',
      status: 409,
    });
  }

  static duplicatedSubject(
    subject: string,
    onError: (errorResponse: ErrorResponse) => void
  ) {
    onError({
      message: `The ${subject?.toLowerCase()} already exists.`,
      status: 409,
    });
  }

  static notFound(
    subject: string,
    onError: (errorResponse: ErrorResponse) => void
  ) {
    onError({
      message: `The ${subject?.toLowerCase()} could not be found.`,
      status: 404,
    });
  }

  static invalidIdFormat(onError: (errorResponse: ErrorResponse) => void) {
    onError({ message: `The ID has an invalid format.`, status: 500 });
  }
}
