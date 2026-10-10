export interface Album {
  id: string;
  title: string;
  artist: string;
  image?: string;
}

export interface AlbumDetail {
  id: string;
  name: string;
  artist: string;
  image: string;
  summary: string;
  listeners: number;
  playcount: number;
  tags: string[];
  tracks: AlbumTrack[];
}

export interface AlbumTrack {
  id: string;
  title: string;
  duration: number;
  url: string;
  rank: number;
  artist: string;
}
