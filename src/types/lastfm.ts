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

export interface LastFmAlbum {
  artist: string;
  image: LastFmImage[];
  mbid: string;
  name: string;
  streamable: string;
  url: string;
}

export interface LastFmAlbumSearchResponse {
  results: {
    albummatches: {
      album: LastFmAlbum[];
    };
  };
}

export interface LastFmTrack {
  artist: string;
  image: LastFmImage[];
  listeners: string;
  mbid: string;
  name: string;
  streamable: string;
  url: string;
}

export interface LastFmTrackSearchResponse {
  results: {
    trackmatches: {
      track: LastFmTrack[];
    };
  };
}
