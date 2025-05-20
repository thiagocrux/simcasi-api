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
  if (!id!.match(/^[0-9a-fA-F]{24}$/)) {
    onError({ message: `ID ${id} has not a valid format.`, status: 500 });
    return;
  }
}

export function handleNotFoundError(
  { name, id, condition }: ErrorHandlerParams,
  onError: (errorResponse: ErrorResponse) => void
) {
  if (!condition) {
    onError({
      message: `${name}${id ? ` with ID ${id}` : ''} could not be found.`,
      status: 404,
    });

    return;
  }
}

export function handleDuplicationError(
  { name, condition }: ErrorHandlerParams,
  onError: (errorResponse: ErrorResponse) => void
) {
  if (condition) {
    onError({
      message: `${name} has already been created.`,
      status: 409,
    });

    return;
  }
}
