export interface Artist {
  id: string;
  name: string;
  genre?: string;
  image?: string;
  listeners: number;
}

export interface ArtistDetail {
  bio: string;
  image?: string;
  id: string;
  name: string;
  similar: SimilarArtist[];
  listeners?: string;
  playcount: string;
  tags: string[];
}

export interface SimilarArtist {
  image: string;
  name: string;
}
