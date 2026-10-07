import type { Album, Artist, ArtistDetail, Track } from "../types";
import type {
  LastFmAlbum,
  LastFmArtist,
  LastFmArtistInfo,
  LastFmChartTrack,
  LastFmTopAlbum,
  LastFmTopTrack,
  LastFmTrack,
} from "../types/lastfm";
import { stripHtml } from "../utils/stripHtml";

export function mapLastFmArtist(artist: LastFmArtist): Artist {
  const image =
    artist.image.find((image) => image.size === "extralarge")?.["#text"] ||
    artist.image.find((image) => image["#text"] !== "")?.["#text"];

  return {
    id: artist.mbid || artist.name,
    name: artist.name,
    image,
    listeners: Number(artist.listeners),
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

export function mapLastFmArtistInfo(
  artistInfo: LastFmArtistInfo,
): ArtistDetail {
  const image =
    artistInfo.image.find((image) => image.size === "extralarge")?.["#text"] ||
    artistInfo.image.find((image) => image["#text"] !== "")?.["#text"];

  return {
    bio: stripHtml(artistInfo.bio.summary),
    image,
    id: artistInfo.mbid || artistInfo.name,
    name: artistInfo.name,
    similar: artistInfo.similar.artist.map((artist) => ({
      image:
        artist.image.find((image) => image.size === "extralarge")?.["#text"] ||
        artist.image.find((image) => image["#text"] !== "")?.["#text"] ||
        "",
      name: artist.name,
    })),
    listeners: artistInfo.stats.listeners,
    playcount: artistInfo.stats.playcount,
    tags: artistInfo.tags.tag.map((tag) => tag.name),
  };
}

export function mapLastFmArtistTopTracks(tracks: LastFmTopTrack[]): Track[] {
  return tracks.map((track) => {
    const image =
      track.image.find((image) => image.size === "extralarge")?.["#text"] ||
      track.image.find((image) => image["#text"] !== "")?.["#text"];

    return {
      id: track.mbid || `${track.artist.name}-${track.name}`,
      title: track.name,
      artist: track.artist.name,
      image,
      listeners: Number(track.listeners),
    };
  });
}

export function mapLastFmArtistTopAlbums(albums: LastFmTopAlbum[]): Album[] {
  return albums.map((album) => {
    const image =
      album.image.find((image) => image.size === "extralarge")?.["#text"] ||
      album.image.find((image) => image["#text"] !== "")?.["#text"] ||
      "";

    return {
      id: album.mbid || `${album.artist.name}-${album.name}`,
      title: album.name,
      artist: album.artist.name,
      image,
    };
  });
}

export function mapLastFmChartTrack(track: LastFmChartTrack): Track {
  const image =
    track.image.find((image) => image.size === "extralarge")?.["#text"] ||
    track.image.find((image) => image["#text"] !== "")?.["#text"];

  return {
    id: track.mbid || `${track.artist.name}-${track.name}`,
    title: track.name,
    artist: track.artist.name,
    image,
    duration: track.duration,
    listeners: Number(track.listeners),
  };
}
