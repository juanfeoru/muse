export interface Artist {
  id: string;
  name: string;
  genre?: string;
  image?: string;
  listeners: number;
}

export interface ArtistDetail {
  id: string;
  name: string;
  bio: string;
  image?: string;
  listeners: number;
  playcount: number;
  tags: string[];
  similar: SimilarArtist[];
}

export interface SimilarArtist {
  name: string;
  image: string;
}
