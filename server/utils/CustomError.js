const spotifyError = class CustomSpotifyError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 422;
      this.name = "NotFoundError";
    }
}

const BadRequestError = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}

const unauthorizedError = class unauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedError";
  }
}

const ForbiddenError = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 501;
    this.name = "ForbiddenError";
  }
}

const TokenExpiredError = class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "TokenExpiredError";
  }
}

module.exports = {spotifyError, BadRequestError,unauthorizedError, ForbiddenError, TokenExpiredError}

  