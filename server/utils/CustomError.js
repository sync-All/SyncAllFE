const spotifyError = class CustomSpotifyError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 422;
      this.name = "NotFoundError";
    }
}

module.exports = {spotifyError}

  