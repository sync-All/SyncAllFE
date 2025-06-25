const { camelCaseToNormal } = require("./userUtils");

const spotifyError = class CustomSpotifyError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 422;
      this.name = "spotifyError";
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

const TooManyRequestError = class TooManyRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 429;
    this.name = "TooManyRequestError";
  }
}

function formatMongooseError(error) {
  if (error.name === 'ValidationError') {
    const errorItems = Object.values(error.errors).map(val =>{
      console.log(val)
      return `Invalid ${val.kind} value for ${camelCaseToNormal(val.path)}: '${val.value}'. Expected a valid ${val.kind}`
    })
    return errorItems[0]
  }
  if (error.code && error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    return `Duplicate data ${key} already exists.`
  }
  return `Error, ${error.message}`
}

module.exports = {spotifyError, BadRequestError,unauthorizedError, ForbiddenError, TokenExpiredError,TooManyRequestError,formatMongooseError}

  