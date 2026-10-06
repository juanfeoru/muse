import type { Album, Artist, Track } from "../types";
import type { LastFmAlbum, LastFmArtist, LastFmTrack } from "../types/lastfm";

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

export function mapLastFmAlbum(album: LastFmAlbum): Album {
  const image =
    album.image.find((image) => image.size === "extralarge")?.["#text"] ||
    album.image.find((image) => image["#text"] !== "")?.["#text"];

  return {
    id: album.mbid || `${album.artist}-${album.name}`,
    title: album.name,
    artist: album.artist,
    image,
  };
}

export function mapLastFmTrack(track: LastFmTrack): Track {
  return {
    id: track.mbid || `${track.artist}-${track.name}`,
    title: track.name,
    artist: track.artist,
    listeners: Number(track.listeners),
  };
}
