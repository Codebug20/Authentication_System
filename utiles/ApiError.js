class ApiError extends Error {
  constructor(statuscode, message, errors = [], stack = "") {
    super(message);
    this.errors = errors;
    this.statuscode = statuscode;
    this.message = message;
    this.success = statuscode < 400;
    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
