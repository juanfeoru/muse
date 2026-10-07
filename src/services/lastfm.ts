import type {
  LastFmAlbumSearchResponse,
  LastFmArtistSearchResponse,
  LastFmArtistTopAlbumsResponse,
  LastFmArtistTopTracksResponse,
  LastFmGetArtistInfoResponse,
  LastFmTopAlbumsResponse,
  LastFmTopArtistsResponse,
  LastFmTopTracksResponse,
  LastFmTrackSearchResponse,
} from "../types/lastfm";

const BASE_URL = "https://ws.audioscrobbler.com/2.0";
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

export async function searchArtists(query: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "artist.search");
  url.searchParams.set("artist", query);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch artists");
  }

  const data: LastFmArtistSearchResponse = await response.json();

  return data.results.artistmatches.artist;
}

export async function searchAlbums(query: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "album.search");
  url.searchParams.set("album", query);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const data: LastFmAlbumSearchResponse = await response.json();

  return data.results.albummatches.album;
}

export async function searchTracks(query: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "track.search");
  url.searchParams.set("track", query);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tracks");
  }

  const data: LastFmTrackSearchResponse = await response.json();

  return data.results.trackmatches.track;
}

export async function getArtistInfo(identifier: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "artist.getInfo");
  url.searchParams.set("artist", identifier);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch artist info");
  }

  const data: LastFmGetArtistInfoResponse = await response.json();

  return data.artist;
}

export async function getArtistTopTracks(identifier: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "artist.gettoptracks");
  url.searchParams.set("artist", identifier);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch artist top tracks");
  }

  const data: LastFmArtistTopTracksResponse = await response.json();

  return data.toptracks.track;
}

export async function getArtistTopAlbums(identifier: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "artist.gettopalbums");
  url.searchParams.set("artist", identifier);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch artist top albums");
  }

  const data: LastFmArtistTopAlbumsResponse = await response.json();

  return data.topalbums.album;
}

export async function getTopArtists() {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "chart.gettopartists");
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch top artists");
  }

  const data: LastFmTopArtistsResponse = await response.json();

  return data.artists.artist;
}

export async function getTopTracks() {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "chart.gettoptracks");
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  const data: LastFmTopTracksResponse = await response.json();

  return data.tracks.track;
}

export async function getTopAlbums(tag: string) {
  const url = new URL(BASE_URL);

  url.searchParams.set("method", "tag.getTopAlbums");
  url.searchParams.set("tag", tag);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch top albums");
  }

  const data: LastFmTopAlbumsResponse = await response.json();

  return data.albums.album;
}
