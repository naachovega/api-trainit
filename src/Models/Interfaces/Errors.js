class CustomError extends Error {
  constructor(message, code, stackErrorMessage) {
    super(message)
    this.message = message;
    this.code = code;
    this.stackErrorMessage = stackErrorMessage;
  }
}

export { CustomError };
