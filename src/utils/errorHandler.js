/**
 * Centralized API & Payment Error Parser
 */
export function parseApiError(error, defaultMessage = "An unexpected error occurred. Please try again.") {
  if (!error) return defaultMessage;

  if (typeof error === "string") return error;

  // Axios or custom ApiError with response payload
  if (error.data) {
    if (error.data.message) return error.data.message;
    if (Array.isArray(error.data.errors) && error.data.errors.length > 0) {
      return error.data.errors[0]?.msg || error.data.errors[0]?.message || defaultMessage;
    }
  }

  // Standard Error message
  if (error.message) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return "Unable to connect to the server. Please check your internet connection.";
    }
    return error.message;
  }

  return defaultMessage;
}

export default parseApiError;
