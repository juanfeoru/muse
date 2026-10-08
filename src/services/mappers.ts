import type { Album, Artist, ArtistDetail, Track } from "../types";
import type {
  LastFmAlbum,
  LastFmArtist,
  LastFmArtistInfo,
  LastFmChartTrack,
  LastFmImage,
  LastFmTopAlbum,
  LastFmTopTrack,
  LastFmTrack,
} from "../types/lastfm";
import { stripHtml } from "../utils/stripHtml";

function pickImage(
  images: LastFmImage[],
  size = "extralarge",
): string | undefined {
  return (
    images.find((image) => image.size === size)?.["#text"] ||
    images.find((image) => image["#text"] !== "")?.["#text"]
  );
}

export function mapLastFmArtist(artist: LastFmArtist): Artist {
  return {
    id: artist.mbid || artist.name,
    name: artist.name,
    image: pickImage(artist.image),
    listeners: Number(artist.listeners),
  };
}

export function mapLastFmAlbum(album: LastFmAlbum): Album {
  return {
    id: album.mbid || `${album.artist}-${album.name}`,
    title: album.name,
    artist: album.artist,
    image: pickImage(album.image),
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
  return {
    bio: stripHtml(artistInfo.bio.summary),
    image: pickImage(artistInfo.image),
    id: artistInfo.mbid || artistInfo.name,
    name: artistInfo.name,
    similar: artistInfo.similar.artist.map((artist) => ({
      image: pickImage(artist.image) || "",
      name: artist.name,
    })),
    listeners: Number(artistInfo.stats.listeners),
    playcount: Number(artistInfo.stats.playcount),
    tags: artistInfo.tags.tag.map((tag) => tag.name),
  };
}

export function mapLastFmArtistTopTracks(tracks: LastFmTopTrack[]): Track[] {
  return tracks.map((track) => ({
    id: track.mbid || `${track.artist.name}-${track.name}`,
    title: track.name,
    artist: track.artist.name,
    image: pickImage(track.image),
    listeners: Number(track.listeners),
  }));
}

export function mapLastFmArtistTopAlbums(albums: LastFmTopAlbum[]): Album[] {
  return albums.map((album) => ({
    id: album.mbid || `${album.artist.name}-${album.name}`,
    title: album.name,
    artist: album.artist.name,
    image: pickImage(album.image) || "",
  }));
}

export function mapLastFmChartTrack(track: LastFmChartTrack): Track {
  return {
    id: track.mbid || `${track.artist.name}-${track.name}`,
    title: track.name,
    artist: track.artist.name,
    image: pickImage(track.image),
    duration: track.duration,
    listeners: Number(track.listeners),
  };
}

export function mapLastFmTopAlbum(album: LastFmTopAlbum): Album {
  return {
    id: album.mbid || `${album.artist.name}-${album.name}`,
    title: album.name,
    artist: album.artist.name,
    image: pickImage(album.image) || "",
  };
}
