import type { LastFmArtistSearchResponse } from "../types/lastfm";

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
