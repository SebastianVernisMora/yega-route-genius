export interface ApiErrorHandlerOptions {
  defaultMessage?: string;
  context?: string;
  isCritical?: boolean;
}

export function handleApiError(
  error: unknown,
  { defaultMessage = 'Ocurrió un error inesperado.', context, isCritical = true }: ApiErrorHandlerOptions = {}
): string {
  let message = defaultMessage;

  if (error instanceof Error && error.message) {
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
