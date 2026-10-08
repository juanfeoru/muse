export interface LastFmImage {
  size: string;
  "#text": string;
}

interface LastFmPagination {
  page: string;
  perPage: string;
  total: string;
  totalPages: string;
}

interface LastFmRankAttributes {
  rank: string;
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

export interface LastFmTopTrack {
  "@attr": LastFmRankAttributes;
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
    "@attr": LastFmPagination & {
      artist: string;
    };
    track: LastFmTopTrack[];
  };
}

interface LastFmTopAlbumArtist {
  mbid: string;
  name: string;
  url: string;
}

export interface LastFmTopAlbum {
  "@attr": LastFmRankAttributes;
  artist: LastFmTopAlbumArtist;
  image: LastFmImage[];
  mbid: string;
  name: string;
  playcount: string;
  url: string;
}

export interface LastFmArtistTopAlbumsResponse {
  topalbums: {
    "@attr": LastFmPagination & {
      artist: string;
    };
    album: LastFmTopAlbum[];
  };
}

export interface LastFmTopArtistsResponse {
  artists: {
    "@attr": LastFmPagination;
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
    "@attr": LastFmPagination;
    track: LastFmChartTrack[];
  };
}

export interface LastFmTopAlbumsResponse {
  albums: {
    "@attr": LastFmPagination & {
      tag: string;
    };
    album: LastFmTopAlbum[];
  };
}

export interface LastFmTopTagsResponse {
  toptags: {
    tag: Array<{
      name: string;
      count: number;
      reach: number;
    }>;
  };
}

export interface LastFmTopTag {
  name: string;
  count: number;
  reach: number;
}

export interface LastFmTopArtistsResponse {
  topartists: {
    "@attr": LastFmPagination;
    artist: LastFmArtist[];
  };
}
