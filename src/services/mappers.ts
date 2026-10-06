import type { Artist } from "../types";
import type { LastFmArtist } from "../types/lastfm";

export function mapLastFmArtist(artist: LastFmArtist): Artist {
  const image =
    artist.image.find((image) => image.size === "extralarge")?.["#text"] ||
    artist.image.find((image) => image["#text"] !== "")?.["#text"];

  return {
    id: artist.mbid || artist.name,
    name: artist.name,
    image,
  };
}
