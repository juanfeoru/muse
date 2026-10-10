import type {
  LastFmAlbumInfoResponse,
  LastFmAlbumSearchResponse,
  LastFmArtistSearchResponse,
  LastFmArtistTopAlbumsResponse,
  LastFmArtistTopTracksResponse,
  LastFmGetArtistInfoResponse,
  LastFmTopAlbumsResponse,
  LastFmTopArtistsResponse,
  LastFmTopTagsResponse,
  LastFmTopTracksResponse,
  LastFmTrackSearchResponse,
} from "../types/lastfm";

const BASE_URL = "https://ws.audioscrobbler.com/2.0";
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

interface LastFmErrorResponse {
  error: number;
  message: string;
}

export class LastFmApiError extends Error {
  status?: number;
  code?: number;

  constructor(message: string, status?: number, code?: number) {
    super(message);
    this.name = "LastFmApiError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(
  params: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> {
  if (!API_KEY) {
    throw new LastFmApiError("Last.fm API key is missing");
  }

  const url = new URL(BASE_URL);

  Object.entries({
    ...params,
    api_key: API_KEY,
    format: "json",
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, { signal });

  let data: T | LastFmErrorResponse;

  try {
    data = await response.json();
  } catch {
    throw new LastFmApiError(
      `Last.fm returned an invalid response (${response.status})`,
      response.status,
    );
  }

  if (!response.ok) {
    throw new LastFmApiError(
      `Last.fm request failed (${response.status})`,
      response.status,
    );
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    "message" in data
  ) {
    const errorData = data as LastFmErrorResponse;

    throw new LastFmApiError(
      errorData.message,
      response.status,
      errorData.error,
    );
  }

  return data as T;
}

export async function searchArtists(query: string, signal?: AbortSignal) {
  const data = await request<LastFmArtistSearchResponse>(
    {
      method: "artist.search",
      artist: query,
    },
    signal,
  );

  return data.results.artistmatches.artist;
}

export async function searchAlbums(query: string, signal?: AbortSignal) {
  const data = await request<LastFmAlbumSearchResponse>(
    {
      method: "album.search",
      album: query,
    },
    signal,
  );

  return data.results.albummatches.album;
}

export async function searchTracks(query: string, signal?: AbortSignal) {
  const data = await request<LastFmTrackSearchResponse>(
    {
      method: "track.search",
      track: query,
    },
    signal,
  );

  return data.results.trackmatches.track;
}

export async function getArtistInfo(identifier: string, signal?: AbortSignal) {
  const data = await request<LastFmGetArtistInfoResponse>(
    {
      method: "artist.getInfo",
      artist: identifier,
    },
    signal,
  );

  return data.artist;
}

export async function getArtistTopTracks(
  identifier: string,
  signal?: AbortSignal,
) {
  const data = await request<LastFmArtistTopTracksResponse>(
    {
      method: "artist.gettoptracks",
      artist: identifier,
    },
    signal,
  );

  return data.toptracks.track;
}

export async function getArtistTopAlbums(
  identifier: string,
  signal?: AbortSignal,
) {
  const data = await request<LastFmArtistTopAlbumsResponse>(
    {
      method: "artist.gettopalbums",
      artist: identifier,
    },
    signal,
  );

  return data.topalbums.album;
}

export async function getTopArtists(signal?: AbortSignal) {
  const data = await request<LastFmTopArtistsResponse>(
    {
      method: "chart.gettopartists",
    },
    signal,
  );

  return data.artists.artist;
}

export async function getTopTracks(signal?: AbortSignal) {
  const data = await request<LastFmTopTracksResponse>(
    {
      method: "chart.gettoptracks",
    },
    signal,
  );

  return data.tracks.track;
}

export async function getTopAlbums(tag: string, signal?: AbortSignal) {
  const data = await request<LastFmTopAlbumsResponse>(
    {
      method: "tag.getTopAlbums",
      tag,
    },
    signal,
  );

  return data.albums.album;
}

export async function getTopArtistsByTag(tag: string, signal?: AbortSignal) {
  const data = await request<LastFmTopArtistsResponse>(
    {
      method: "tag.gettopartists",
      tag,
    },
    signal,
  );

  return data.topartists.artist;
}

export async function getTopAlbumsByTag(tag: string, signal?: AbortSignal) {
  const data = await request<LastFmTopAlbumsResponse>(
    {
      method: "tag.gettopalbums",
      tag,
    },
    signal,
  );

  return data.albums.album;
}

export async function getTopTags(signal?: AbortSignal) {
  const data = await request<LastFmTopTagsResponse>(
    {
      method: "tag.gettoptags",
    },
    signal,
  );

  return data.toptags.tag;
}

export async function getAlbumInfo(
  artist: string,
  album: string,
  signal?: AbortSignal,
) {
  const data = await request<LastFmAlbumInfoResponse>(
    {
      method: "album.getinfo",
      artist,
      album,
    },
    signal,
  );

  return data.album;
}
