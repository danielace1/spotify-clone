export interface Song {
  audioUrl: string | null;
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
}

export interface Stats {
  totalUsers: number;
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
}
