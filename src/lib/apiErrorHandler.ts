export interface ApiErrorHandlerOptions {
  defaultMessage?: string;
  context?: string;
  isCritical?: boolean;
}

// A type guard to check if the error has a status property
const isApiError = (error: unknown): error is { message: string; status: number } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error
  );
};

export function handleApiError(
  error: unknown,
  { defaultMessage = 'Ocurrió un error inesperado.', context, isCritical = true }: ApiErrorHandlerOptions = {}
): string {
  let message = defaultMessage;

  if (isApiError(error)) {
    switch (error.status) {
      case 400:
        message = 'Solicitud incorrecta. Por favor, verifica los datos.';
        break;
      case 401:
        message = 'No autorizado. Por favor, inicia sesión de nuevo.';
        break;
      case 403:
        message = 'No tienes permiso para realizar esta acción.';
        break;
      case 404:
        message = 'No se encontró el recurso solicitado.';
        break;
      case 500:
      case 502:
      case 503:
        message = 'Error del servidor. Por favor, inténtalo de nuevo más tarde.';
        break;
      default:
        message = error.message || defaultMessage;
    }
  } else if (error instanceof Error && error.message) {
    message = error.message;
  }

  const logPrefix = context ? `[${context}]` : '';

  if (isCritical) {
    console.error(`API error ${logPrefix}`, error);
    // Attempt to capture error with Sentry if available
    const globalWindow = window as Window & {
      Sentry?: { captureException?(err: unknown): void };
    };
    globalWindow.Sentry?.captureException?.(error);
  } else {
    console.warn(`API error ${logPrefix}`, error);
  }

  return message;
}
