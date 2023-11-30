class CreatingError extends Error {
  constructor(message, code, stackErrorMessage) {
    this.message = message;
    this.code = code;
    this.stackErrorMessage = stackErrorMessage;
  }
}

export { CreatingError };
