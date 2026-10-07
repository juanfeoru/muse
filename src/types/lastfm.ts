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

interface LastFmArtistBio {
  links: {
    link: {
      "#text": string;
      href: string;
      rel: string;
    };
  };
  published: string;
  summary: string;
  content: string;
}

interface LastFmSimilarArtist {
  name: string;
  url: string;
  image: LastFmImage[];
}

interface LastFmArtistTag {
  name: string;
  url: string;
}

export interface LastFmArtistInfo {
  name: string;
  mbid: string;
  url: string;
  streamable: string;
  ontour: string;
  image: LastFmImage[];
  stats: {
    listeners: string;
    playcount: string;
  };
  bio: LastFmArtistBio;
  similar: {
    artist: LastFmSimilarArtist[];
  };
  tags: {
    tag: LastFmArtistTag[];
  };
}

export interface LastFmGetArtistInfoResponse {
  artist: LastFmArtistInfo;
}

interface LastFmTopTrackArtist {
  mbid: string;
  name: string;
  url: string;
}

interface LastFmTopTrackAttributes {
  rank: string;
}

export interface LastFmTopTrack {
  "@attr": LastFmTopTrackAttributes;
  artist: LastFmTopTrackArtist;
  image: LastFmImage[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  streamable: string;
  url: string;
}

export interface LastFmArtistTopTracksResponse {
  toptracks: {
    "@attr": {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
    track: LastFmTopTrack[];
  };
}

interface LastFmTopAlbumArtist {
  mbid: string;
  name: string;
  url: string;
}

interface LastFmTopAlbumAttributes {
  rank: string;
}

export interface LastFmTopAlbum {
  "@attr": LastFmTopAlbumAttributes;
  artist: LastFmTopAlbumArtist;
  image: LastFmImage[];
  mbid: string;
  name: string;
  playcount: string;
  url: string;
}

export interface LastFmArtistTopAlbumsResponse {
  topalbums: {
    "@attr": {
      artist: string;
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
    album: LastFmTopAlbum[];
  };
}

export interface LastFmTopArtistsResponse {
  artists: {
    "@attr": {
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
    artist: LastFmArtist[];
  };
}

export interface LastFmChartTrack {
  artist: LastFmTopAlbumArtist;
  duration: string;
  image: LastFmImage[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  streamable: {
    fulltrack: string;
    "#text": string;
  };
  url: string;
}

export interface LastFmTopTracksResponse {
  tracks: {
    "@attr": {
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
    track: LastFmChartTrack[];
  };
}
