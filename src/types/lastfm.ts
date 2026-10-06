interface LastFmImage {
  size: string;
  "#text": string;
}

export interface LastFmArtist {
  name: string;
  listeners: string;
  mbid: string;
  streamable: string;
  url: string;
  image: LastFmImage[];
}

export interface LastFmArtistSearchResponse {
  results: {
    artistmatches: {
      artist: LastFmArtist[];
    };
  };
}
