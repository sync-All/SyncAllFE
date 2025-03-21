export interface notification {
    _id : string;
    title :  string;
    message : string;
    createdAt : string | Date;
    read : boolean;
}
export interface TrackData {
  _id: string;
  releaseType: string;
  releaseTitle: string;
  mainArtist: string;
  featuredArtist: string;
  trackTitle: string;
  upc: string;
  isrc: string;
  trackLink: string;
  genre: string;
  subGenre: string;
  claimBasis: string;
  role: string;
  percentClaim: string;
  recordingVersion: string;
  featuredInstrument: string;
  producers: string;
  recordingDate: string;
  countryOfRecording: string;
  writers: string;
  composers: string;
  publishers: string;
  copyrightName: string;
  copyrightYear: string;
  releaseDate: string;
  countryOfRelease: string;
  mood: string;
  tag: string;
  lyrics: string;
  audioLang: string;
  releaseLabel: string;
  releaseDesc: string;
  message?: string;
  err_type?: string;
  user: string;
  trackOwner: string;
}