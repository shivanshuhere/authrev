class ErrorResponse {
    constructor(
        statusCode,
        message = "something went wrong",
        error = [],
        stack = ""
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ErrorResponse;
