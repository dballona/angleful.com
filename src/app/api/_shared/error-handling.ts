type FieldErrors = {
  [key: string]: string[] | undefined;
};

export class ApplicationError extends Error {
  fieldErrors: FieldErrors;
  formErrors: string[];
  status: number;

  constructor({
    fieldErrors,
    formErrors,
    status,
  }: {
    fieldErrors: FieldErrors;
    formErrors: string[];
    status: number;
  }) {
    super('ApplicationError');
    this.fieldErrors = fieldErrors;
    this.formErrors = formErrors;
    this.status = status;
  }
}

export function withErrorHandling(
  fn: (request: Request, ...args: any) => Promise<Response>,
) {
  return async function (request: Request, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      if (error instanceof ApplicationError) {
        // Respond with a generic 500 Internal Server Error
        return Response.json(
          {
            error: error.formErrors.join(', '),
            fieldErrors: error.fieldErrors,
          },
          { status: error.status },
        );
      }

      throw error;
    }
  };
}
