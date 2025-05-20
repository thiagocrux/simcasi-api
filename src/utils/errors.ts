interface ErrorResponse {
  status: number;
  message: string;
}

interface ErrorHandlerParams {
  name?: string;
  id?: string;
  condition?: boolean;
}

export function handleInvalidIDFormatError(
  { id }: ErrorHandlerParams,
  onError: (errorResponse: ErrorResponse) => void
) {
  onError({ message: `ID ${id} has not a valid format.`, status: 500 });
}

export function handleNotFoundError(
  { name, id }: ErrorHandlerParams,
  onError: (errorResponse: ErrorResponse) => void
) {
  onError({
    message: `${name}${id ? ` with ID ${id}` : ''} could not be found.`,
    status: 404,
  });
}

export function handleDuplicationError(
  { name }: ErrorHandlerParams,
  onError: (errorResponse: ErrorResponse) => void
) {
  onError({
    message: `${name} has already been created.`,
    status: 409,
  });
}
