
const SpotifyHelper = (spotifyLink: string): string | null => {
  const match = spotifyLink.match(
    /https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(\?.*)?/
  );

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export default SpotifyHelper;
